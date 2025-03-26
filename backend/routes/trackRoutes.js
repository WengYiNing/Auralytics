const express = require('express');
const axios = require('axios');

module.exports = function(client) {
    const router = express.Router();

    const fetchTopTracks = async (timeRange, accessToken, userId) => {
        const cacheKey = `${userId}:top-tracks${timeRange}`;
        console.log("Fetching from cache with key: ", cacheKey);
    
        try {
            console.log("Redis Client Ready:", client.isOpen);

            let cachedTracks = await client.get(cacheKey); 
            if (cachedTracks) {
                console.log("Data fetched from cache: ");
                return JSON.parse(cachedTracks);
            }
    
            console.log("No data in cache, fetching from Spotify");
            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            console.log("Data received from Spotify: ")
            await client.setEx(cacheKey, 3600, JSON.stringify(response.data.items)); 
            return response.data.items;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error; 
        }
    };

    router.get('/top-tracks/:userId/:timeRange', async (req, res) => {
        const { userId, timeRange } = req.params;
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send('Invalid or expired token');
        }
    
        try {
            const topTracks = await fetchTopTracks(timeRange, accessToken, userId);
            const formattedTracks = topTracks.map(track => ({
                trackId: track.id,
                name: track.name,
                artistName: track.artists[0].name,
                albumName: track.album.name,
                albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : '',
                duration_ms: track.duration_ms,
                popularity: track.popularity,
                release_date: new Date(track.album.release_date).toISOString()
            }));
            res.json(formattedTracks);
        } catch (error) {
            console.error("Failed to retrieve and update top tracks:", error.message);
            res.status(500).send("Failed to retrieve and update top tracks: " + error.message);
        }
    });

    return router; 
};
