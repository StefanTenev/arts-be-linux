import jwt from 'jsonwebtoken'
import redis from '../../../config/redis';


/**
 * GET
 */

export default class AccessJWT {

    private username: string;
    private userId: string;

    constructor ( username: string, userId: string ) {
        this.username = username;
        this.userId = userId;
    }

    generateToken = async () => {

        const expireTime = 900 // seconds = 15 min
        const accessJWT = jwt.sign(
            { username: this.username },
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn: expireTime + 's'}
        );
    
        await redis.set(`access_jwt_token:${this.userId}`, accessJWT);
        await redis.expire(`access_jwt_token:${this.userId}`, expireTime); 
    
        return accessJWT
        
    }

    getCurrentToken = async () => {
        const storedToken = await redis.get(`access_jwt_token:${this.userId}`);
        return storedToken ? storedToken : ''
    } 

    validateToken = async (token: string | undefined): Promise<boolean> => {

        const storedToken = await this.getCurrentToken()
        return token === storedToken; // Compare the received token with the stored token

    };

    invalidateToken = async () => {
        await redis.del(`access_jwt_token:${this.userId}`)
    }

}