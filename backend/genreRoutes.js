const express = require('express');
const axios = require('axios');

module.exports = function(client) {
    const router = express.Router();

    const fetchTopArtists = async (timeRange, accessToken, userId) => {
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

    const validateToken = async (accessToken) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            console.log("Token is valid. User data:", response.data);
            return true;  
        } catch (error) {
            console.error("Token validation failed:", error.response ? error.response.data : error.message);
            return false; 
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
            const topArtists = await fetchTopArtists(timeRange, accessToken, userId);

            const genreScores = {};
            topArtists.forEach((artist, index) => {
                const score = 50 - index; 
                artist.genres.forEach(genre => {
                    if (genreScores[genre]) {
                        genreScores[genre] += score; 
                    } else {
                        genreScores[genre] = score; 
                    }
                });
            });

            const sortedGenres = Object.entries(genreScores)
                .map(([genre, score]) => ({ genre, score }))
                .sort((a, b) => b.score - a.score);

            res.json(sortedGenres);
        } catch (error) {
            console.error("Failed to retrieve and update top genres:", error.message);
            res.status(500).send("Failed to retrieve and update top genres: " + error.message);
        }
    });

    return router; 
};
