import jwt from 'jsonwebtoken'
import redis from '../../../config/redis';
import { Response } from 'express';


/**
 * GET
 */

export default class RefreshJWT {

    private username: string;
    private userId: string;

    constructor ( username: string, userId: string ) {
        this.username = username;
        this.userId = userId;
    }

    generateToken = async () => {

        const expireTime = 604800 // seconds = 7 days
        const refreshJWT = jwt.sign(
            { username: this.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn: expireTime + 'd'}
        );
    
        await redis.set(`refresh_jwt_token:${this.userId}`, refreshJWT);
        await redis.expire(`refresh_jwt_token:${this.userId}`, expireTime);
    
        return refreshJWT
    }

    validateToken = async (token: string | undefined): Promise<boolean> => {

        const storedToken = await redis.get(`refresh_jwt_token:${this.userId}`);
        return token === storedToken; // Compare the received token with the stored token

    };

    invalidateToken = async (res: Response) => {

        res.cookie('refreshToken', '', {
            httpOnly: true,
            path: '/login', // Same path as when the cookie was created
            maxAge: 0, // Expire the cookie immediately
          });

        await redis.del(`refresh_jwt_token:${this.userId}`)
    }

}