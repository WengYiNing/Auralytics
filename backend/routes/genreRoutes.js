const express = require('express');
const axios = require('axios');

module.exports = function(client) {
    const router = express.Router();

    const fetchTopGenres = async (timeRange, accessToken, userId) => {
        const cacheKey = `${userId}:artists:${timeRange}`;
        console.log("Fetching from cache with key: ", cacheKey);

        try {
            let cachedArtists = await client.get(cacheKey);
            if (cachedArtists) {
                console.log("Data fetched from cache: ");
                return JSON.parse(cachedArtists);
            }

            console.log("No data in cache, fetching from Spotify");
            const { data } = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            console.log("Data received from Spotify: ");
            await client.setEx(cacheKey, 3600, JSON.stringify(data.items));  
            return data.items;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    };

    router.get('/top-genres/:userId/:timeRange', async (req, res) => {
        const { userId, timeRange } = req.params;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send('Invalid or expired token');
        }

        try {
            const topArtists = await fetchTopGenres(timeRange, accessToken, userId);

            const genreData = {};
            topArtists.forEach((artist, index) => {
                const score = 50 - index;

                artist.genres.forEach(genre => {
                    if (genreData[genre]) {
                        genreData[genre].score += score;
                    } else {
                        genreData[genre] = {
                            score: score,
                            image: artist.images?.[0]?.url || null,
                            url: artist.external_urls?.spotify || null
                        };
                    }
                });
            });

            const sortedGenres = Object.entries(genreData)
                .map(([genre, data]) => ({
                    genre,
                    score: data.score,
                    artistImageUrl: data.image,
                    logoUrl: data.url
                }))
                .sort((a, b) => b.score - a.score);

            res.json(sortedGenres);

        } catch (error) {
            console.error("Failed to retrieve and update top genres:", error.message);
            res.status(500).send("Failed to retrieve and update top genres: " + error.message);
        }
    });

    return router; 
};
