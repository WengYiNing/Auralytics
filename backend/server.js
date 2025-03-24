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

const initializeRedis = () => {
  const client = redis.createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  return client;
};

const configureCors = () => {
  return cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true
  });
};

const configureApp = (app, client) => {
  app.use(configureCors());
  app.use(express.json());

  app.use(userRoutes);
  app.use(trackRoutes(client)); 
  app.use(artistsRoutes(client));
  app.use(albumsRoutes(client));
  app.use(genresRoutes(client));
  app.use(eraRoutes(client));

  app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.path);
    console.log('Headers:', req.headers);
    next();
  });
};

const startServer = async () => {
  const client = initializeRedis();
  
  try {
    await client.connect();
    console.log('Connected to Redis');

    configureApp(app, client);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to Redis or start server:', error);
  }
};

startServer();

module.exports = initializeRedis;
