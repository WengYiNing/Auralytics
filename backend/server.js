const express = require('express');
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const trackRoutes = require('./routes/trackRoutes');
const artistsRoutes = require('./routes/artistsRoutes');
const albumsRoutes = require('./routes/albumsRoutes');
const genresRoutes = require('./routes/genreRoutes');
const eraRoutes = require('./routes/eraRoutes');

const app = express();
const PORT = process.env.PORT || 8888;

const client = redis.createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to Redis');

        app.use(cors({
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
            credentials: true
        }));

        app.use(express.json());

        app.use('/api', userRoutes);
        app.use('/api', trackRoutes(client)); 
        app.use('/api', artistsRoutes(client));
        app.use('/api', albumsRoutes(client));
        app.use('/api', genresRoutes(client));
        app.use('/api', eraRoutes(client));

        app.use((req, res, next) => {
            console.log('Incoming Request:', req.method, req.path);
            console.log('Headers:', req.headers);
            next();
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to Redis or start server:', error);
    }
}

startServer();

module.exports = client;
