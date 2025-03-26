const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/login', (req, res) => {
    console.log('CLIENT_ID:', process.env.CLIENT_ID);
    console.log('REDIRECT_URI:', process.env.REDIRECT_URI);

    console.log('Login route accessed');
    const scopes = 'user-top-read'; 
    const authUrl = 'https://accounts.spotify.com/authorize?' +
    `response_type=code&client_id=${process.env.CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
    `&prompt=login`;

    console.log('Generated Spotify authorization URL:', authUrl);

    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    console.log('Received query parameters:', req.query);
    const code = req.query.code; 
    if (!code) {
        console.error('Authorization code not received');
        return res.status(400).send('Authorization code is required');
    }

    try {
        const tokenResponse = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
            }
        });

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);

        const userResponse = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        const { id, email, display_name } = userResponse.data;

        const redirectBase = process.env.FRONTEND_URL || 'http://localhost:3000';
        const redirectUrl = `${redirectBase}/callback?access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refresh_token)}&user_id=${encodeURIComponent(id)}`;
        console.log('Redirecting to:', redirectUrl);
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error during Spotify interaction:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to handle Spotify data');
    }
});

router.post('/token-exchange', async (req, res) => {
    const { code } = req.body;
    console.log('Received code:', code);  
    
    if (!code) {
        console.error('Authorization code is missing');
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
        console.log('Exchanging code for tokens...');
        const tokenResponse = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
            }
        });

        const { access_token, refresh_token } = tokenResponse.data;

        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${access_token}` }
        });

        const user_id = userResponse.data.id; 

        console.log('Token exchange response:', tokenResponse.data);
        res.json({
            access_token, 
            refresh_token, 
            user_id 
        });
    } catch (error) {
        console.error('Error during Spotify token exchange:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000'); 
});

module.exports = router;
