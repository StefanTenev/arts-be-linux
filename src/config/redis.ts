// src/config/redis.ts
import Redis from 'ioredis';

// Create a new Redis instance
const redis = new Redis({
    host: '127.0.0.1', // Redis server address (localhost)
    port: 6379,        // Default Redis port
});

export default redis;
