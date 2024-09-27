import redis from '../../../config/redis';
import crypto from 'crypto';

export const generateCsrfToken = async (userId: string): Promise<string> => {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    await redis.set(`csrf_token:${userId}`, csrfToken);
    await redis.expire(`csrf_token:${userId}`, 3600); // Expires in 1 hour
    return csrfToken;
};

export const validateCsrfToken = async (userId: string | undefined, token: string | undefined): Promise<boolean> => {
    const storedToken = await redis.get(`csrf_token:${userId}`);
    return token === storedToken; // Compare the received token with the stored token
};
