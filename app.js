const express = require('express');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Create Redis client
const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

// Connect to Redis
client.connect().catch(console.error);

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Root endpoint - increments and displays visit counter
app.get('/', async (req, res) => {
  try {
    // Increment the visit counter
    const visits = await client.incr('visits');
    
    res.send(`
      <h1>¡Hola desde Node.js + Redis!</h1>
      <p>Número de visitas: <strong>${visits}</strong></p>
    `);
  } catch (err) {
    console.error('Error accessing Redis:', err);
    res.status(500).send('Error al acceder a Redis');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
});
