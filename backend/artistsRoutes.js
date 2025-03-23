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
            const { data } = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=20`, {
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

    router.get('/top-artists/:userId/:timeRange', async (req, res) => {
        const { userId, timeRange } = req.params;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send('Invalid or expired token');
        }

        try {
            const topArtists = await fetchTopArtists(timeRange, accessToken, userId);
            const formattedArtists = topArtists.map(artist => ({
                artistId: artist.id,
                name: artist.name,
                artistImageUrl: artist.images && artist.images.length > 0 ? artist.images[0].url : '',
                genres: artist.genres.join(', '),
                popularity: artist.popularity,
                followers: artist.followers.total,
                logoUrl: artist.uri
            }));
            res.json(formattedArtists);
        } catch (error) {
            console.error("Failed to retrieve and update top artists:", error.message);
            res.status(500).send("Failed to retrieve and update top artists: " + error.message);
        }
    });

    return router;  
};
