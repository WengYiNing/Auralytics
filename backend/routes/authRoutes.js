const express = require('express');
const router = express.Router();
const spotifyService = require('../../spotifyService');

router.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`);
});

router.get('/callback', async (req, res) => {
    try {
        const data = await spotifyService.exchangeCodeForToken(req.query.code);
        res.send(`登入成功! Token: ${data.access_token}`);
    } catch (error) {
        res.send(`登入失敗: ${error.message}`);
    }
});

module.exports = router;
