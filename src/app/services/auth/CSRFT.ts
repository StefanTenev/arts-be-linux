import redis from '../../../config/redis';
import crypto from 'crypto';


export default class CSRFT {

    private userId: string;

    constructor ( userId: string ) {
        this.userId = userId;
    }

    generateToken = async (): Promise<string> => {
        const csrfToken = crypto.randomBytes(32).toString('hex');
        await redis.set(`csrf_token:${this.userId}`, csrfToken);
        await redis.expire(`csrf_token:${this.userId}`, 3600); // Expires in 1 hour
        return csrfToken;
    };

    getCurrentToken = async () => {
        const storedToken = await redis.get(`csrf_token:${this.userId}`);
        return storedToken ? storedToken : ''
    } 

    validateToken = async (token: string | undefined): Promise<boolean> => {
        const storedToken = await this.getCurrentToken();
        return token === storedToken; // Compare the received token with the stored token
    };

    invalidateToken = async () => {
        await redis.del(`csrf_token:${this.userId}`)
    }

}
