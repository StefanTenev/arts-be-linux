import jwt from 'jsonwebtoken'
import verifyJWT from './jwtVerifyWrapper';
import { JwtPayload } from 'jsonwebtoken';

interface CustomPayload extends JwtPayload {
    username?: string
    tokenVersion?: number
}

/**
 * GET
 */

export default class RefreshJWT {

    private username: string;
    private userId: string;
    private tokenVersion: number

    constructor ( username: string, userId: string, tokenVersion: number) {
        this.username = username;
        this.userId = userId;
        this.tokenVersion = tokenVersion
    }

    generateToken = async () => {

        const expireTime = 604800 // seconds = 7 days
        const refreshJWT = jwt.sign(
            { username: this.username, tokenVersion: this.tokenVersion },
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn: expireTime + 'd'}
        );
    
        return refreshJWT
    }

    // getCurrentToken = async () => {
    //     const storedToken = await redis.get(`refresh_jwt_token:${this.userId}`);
    //     return storedToken ? storedToken : ''
    // } 

    validateToken = async (token: string, secretKey: string) => {

        try{
            const decodedPayload: CustomPayload = await verifyJWT(token, secretKey)
            if (decodedPayload.tokenVersion === this.tokenVersion){
                return decodedPayload
            }
            return false
        }
        catch(err){
            console.log('ERROR WHEN VALIDATING ACCESS TOKEN / INVALID TOKEN')
            return false
        }

    };

    // invalidateToken = async (res: Response) => {
    //     await redis.del(`refresh_jwt_token:${this.userId}`)
    //     res.clearCookie('refreshJWT', { path: '/' });
    // }

}

