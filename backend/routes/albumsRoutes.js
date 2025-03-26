const express = require('express');
const axios = require('axios');

module.exports = function(client) {
    const router = express.Router();

    const fetchTopAlbums = async (timeRange, accessToken, userId) => {
        const cacheKey = `${userId}:top-albums:${timeRange}`;
        console.log("Fetching from cache with key: ", cacheKey);

        try {
            let cachedAlbums = await client.get(cacheKey);
            if (cachedAlbums) {
                console.log("Album data fetched from cache: ");
                return JSON.parse(cachedAlbums);
            }
    
            console.log("No album data in cache, fetching from Spotify");
            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const albums = {};
            response.data.items.forEach((track, index) => {
                const albumName = track.album.name;
                const artistName = track.artists.map(artist => artist.name).join(', '); 

                const score = 50 - index; 

                if (albums[albumName]) {
                    albums[albumName].score += score;
                } else {
                    albums[albumName] = {
                        score: score, 
                        artistName: artistName, 
                        albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : '',
                        release_date: new Date(track.album.release_date).toISOString()
                    };
                }
            });

            const sortedAlbums = Object.keys(albums)
                .map(key => ({
                    name: key,
                    ...albums[key]
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 10); 

            await client.setEx(cacheKey, 3600, JSON.stringify(sortedAlbums)); 

            return sortedAlbums;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    };

    router.get('/top-albums/:userId/:timeRange', async (req, res) => {
        const { userId, timeRange } = req.params;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send('Invalid or expired token');
        }
    
        try {
            const topAlbums = await fetchTopAlbums(timeRange, accessToken, userId);
            res.json(topAlbums);
        } catch (error) {
            console.error("Failed to retrieve and update top albums:", error.message);
            res.status(500).send("Failed to retrieve and update top albums: " + error.message);
        }
    });

    return router;
};
