const express = require('express');
const axios = require('axios');

module.exports = function(client) {
    const router = express.Router();

    //Fetch Top Tracks to get the albums information.
    const fetchTopTracks = async (timeRange, accessToken, userId) => {
        const cacheKey = `${userId}:top-tracks:${timeRange}`;
        console.log("Fetching top tracks from cache with key: ", cacheKey);

        try {
            let cachedTracks = await client.get(cacheKey);
            if (cachedTracks) {
                console.log("Top tracks data fetched from cache");
                return JSON.parse(cachedTracks);
            }

            console.log("No top tracks data in cache, fetching from Spotify");
            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const tracks = response.data.items.map((track, index) => ({
                id: track.id,
                name: track.name,
                albumId: track.album.id, 
                albumImageUrl: track.album.images[0]?.url,
                weight: 50 - index 
            }));

            await client.setEx(cacheKey, 3600, JSON.stringify(tracks)); 
            return tracks;
        } catch (error) {
            console.error("Failed to fetch top tracks:", error);
            throw error;
        }
    };

    //Fetch albums to get the eras distribution.
    const fetchAlbumInfo = async (albumId, accessToken) => {
        const cacheKey = `album-info:${albumId}`;
        try {
            let cachedAlbumInfo = await client.get(cacheKey);
            if (cachedAlbumInfo) {
                console.log(`Album info for album ${albumId} fetched from cache`);
                return JSON.parse(cachedAlbumInfo);
            }

            console.log(`No cached album info for album ${albumId}, fetching from Spotify`);
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const albumInfo = response.data;
            await client.setEx(cacheKey, 3600, JSON.stringify(albumInfo));  
            return albumInfo;
        } catch (error) {
            console.error(`Failed to fetch album info for album ${albumId}`);
            throw error;
        }
    };

    const calculateTopDecades = (tracks) => {
        const decadeScores = {};
        const topSongsByDecade = {};
    
        tracks.forEach(track => {
            const releaseYear = new Date(track.releaseDate).getFullYear();
            const decadeStart = Math.floor((releaseYear - 1) / 10) * 10 + 1;
            const decadeRange = `${decadeStart}-${decadeStart + 9}`;
    
            if (!decadeScores[decadeRange]) {
                decadeScores[decadeRange] = 0;
                topSongsByDecade[decadeRange] = track; 
            }
    
            decadeScores[decadeRange] += track.weight;
    
            if (track.weight > topSongsByDecade[decadeRange].weight) {
                topSongsByDecade[decadeRange] = track; 
            }
        });
    
        return {
            decadeScores,
            topSongsByDecade
        };
    };

    const mergeDecades = (primaryDecades, secondaryDecades, maxItems = 5, topSongsByPrimary, topSongsBySecondary) => {
        const mergedDecades = { ...primaryDecades };
        const mergedTopSongs = { ...topSongsByPrimary };
        const primaryDecadeCount = Object.keys(primaryDecades).length;

        if (primaryDecadeCount < maxItems) {
            const missingDecades = Object.keys(secondaryDecades).filter(decade => !mergedDecades[decade]);
            for (const decade of missingDecades) {
                mergedDecades[decade] = 1; 
                mergedTopSongs[decade] = topSongsBySecondary[decade];  
                if (Object.keys(mergedDecades).length >= maxItems) {
                    break;
                }
            }
        }

        return {
            decadeScores: mergedDecades,
            topSongsByDecade: mergedTopSongs
        };
    };

    router.get('/track-decades/:userId/:timeRange', async (req, res) => {
        const { userId, timeRange } = req.params;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send('Invalid or expired token');
        }

        try {
            let topTracks, validTracks, topDecades, sixMonthDecades, oneMonthDecades;
            if (timeRange === 'short_term') {
                // Only needs to deal with data in a month.
                topTracks = await fetchTopTracks('short_term', accessToken, userId);
                const oneMonthTracksWithReleaseDate = await Promise.all(topTracks.map(async (track) => {
                    try {
                        const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                        return { ...track, releaseDate: albumInfo.release_date };
                    } catch (error) {
                        return null;
                    }
                }));
                validTracks = oneMonthTracksWithReleaseDate.filter(track => track !== null);
                topDecades = calculateTopDecades(validTracks);
            } else if (timeRange === 'medium_term') {
                // Deal with data in six months first.
                topTracks = await fetchTopTracks('medium_term', accessToken, userId);
                const sixMonthTracksWithReleaseDate = await Promise.all(topTracks.map(async (track) => {
                    try {
                        const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                        return { ...track, releaseDate: albumInfo.release_date };
                    } catch (error) {
                        return null;
                    }
                }));
                validTracks = sixMonthTracksWithReleaseDate.filter(track => track !== null);
                topDecades = calculateTopDecades(validTracks);

                // If the eras in six months are less than 5, then supple from data in a month.
                if (Object.keys(topDecades.decadeScores).length < 5) {
                    oneMonthTracks = await fetchTopTracks('short_term', accessToken, userId);
                    const oneMonthTracksWithReleaseDate = await Promise.all(oneMonthTracks.map(async (track) => {
                        try {
                            const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                            return { ...track, releaseDate: albumInfo.release_date };
                        } catch (error) {
                            return null;
                        }
                    }));
                    validTracks = oneMonthTracksWithReleaseDate.filter(track => track !== null);
                    oneMonthDecades = calculateTopDecades(validTracks);
                    topDecades = mergeDecades(topDecades.decadeScores, oneMonthDecades.decadeScores, 5, topDecades.topSongsByDecade, oneMonthDecades.topSongsByDecade);
                }
            } else if (timeRange === 'long_term') {
                // Deal with data in twelve months first.
                topTracks = await fetchTopTracks('long_term', accessToken, userId);
                const twelveMonthTracksWithReleaseDate = await Promise.all(topTracks.map(async (track) => {
                    try {
                        const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                        return { ...track, releaseDate: albumInfo.release_date };
                    } catch (error) {
                        return null;
                    }
                }));
                validTracks = twelveMonthTracksWithReleaseDate.filter(track => track !== null);
                topDecades = calculateTopDecades(validTracks);

                // If the eras in twelve months are less than 5, then supple from data in six month.
                if (Object.keys(topDecades.decadeScores).length < 5) {
                    sixMonthTracks = await fetchTopTracks('medium_term', accessToken, userId);
                    const sixMonthTracksWithReleaseDate = await Promise.all(sixMonthTracks.map(async (track) => {
                        try {
                            const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                            return { ...track, releaseDate: albumInfo.release_date };
                        } catch (error) {
                            return null;
                        }
                    }));
                    validTracks = sixMonthTracksWithReleaseDate.filter(track => track !== null);
                    sixMonthDecades = calculateTopDecades(validTracks);
                    topDecades = mergeDecades(topDecades.decadeScores, sixMonthDecades.decadeScores, 5, topDecades.topSongsByDecade, sixMonthDecades.topSongsByDecade);

                    //If still not enough, supple from data in one month.
                    if (Object.keys(topDecades.decadeScores).length < 5) {
                        oneMonthTracks = await fetchTopTracks('short_term', accessToken, userId);
                        const oneMonthTracksWithReleaseDate = await Promise.all(oneMonthTracks.map(async (track) => {
                            try {
                                const albumInfo = await fetchAlbumInfo(track.albumId, accessToken);
                                return { ...track, releaseDate: albumInfo.release_date };
                            } catch (error) {
                                return null;
                            }
                        }));
                        validTracks = oneMonthTracksWithReleaseDate.filter(track => track !== null);
                        oneMonthDecades = calculateTopDecades(validTracks);
                        topDecades = mergeDecades(topDecades.decadeScores, oneMonthDecades.decadeScores, 5, topDecades.topSongsByDecade, oneMonthDecades.topSongsByDecade);
                    }
                }
            }

            res.json(topDecades);
        } catch (error) {
            console.error("Failed to analyze track decades", error.message);
            res.status(500).send("Failed to analyze track decades: " + error.message);
        }
    });

    return router;
};
