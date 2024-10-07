import jwt from 'jsonwebtoken'
import verifyJWT from './jwtVerifyWrapper';
import { JwtPayload } from 'jsonwebtoken';
import getTokenVersion from './getTokenVersion';

interface CustomPayload extends JwtPayload {
    username?: string
    tokenVersion?: number
}

/**
 * GET
 */

export default class RefreshJWT {

    private userId: string;

    constructor ( userId: string ) {
        this.userId = userId;
    }

    generateToken = async () => {
        const tokenVersion = await getTokenVersion(this.userId)
        
        if(!tokenVersion && tokenVersion !== 0){
            return null
        }

        const expireTime = 604800 // seconds = 7 days
        const refreshJWT = jwt.sign(
            { userId: this.userId, tokenVersion },
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
        const tokenVersion = await getTokenVersion(this.userId)

        try{
            const decodedPayload: CustomPayload = await verifyJWT(token, secretKey)
            console.log("TOKEN VERSIONS: ", tokenVersion, decodedPayload.tokenVersion)
            if(decodedPayload.tokenVersion !== tokenVersion){
                return false
            }
            return decodedPayload
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

