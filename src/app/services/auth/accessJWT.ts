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

// @TODO - think of an implementation where the version is instantiated for the class once, instead of fetched for each method
// @TODO - tokens need to be signed using the userId...
// @TODO - think about creating a token class and extending it for the refresh/accessjwt

export default class AccessJWT {

    private username: string;
    private userId: string;

    constructor ( username: string, userId: string ) {
        this.username = username;
        this.userId = userId;
    }

    generateToken = async () => {
        const tokenVersion = await getTokenVersion(this.userId)
        
        if(!tokenVersion && tokenVersion !== 0){
            return null
        }
        const expireTime = 900 // seconds = 15 min
        const accessJWT = jwt.sign(
            { username: this.username, tokenVersion},
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn: expireTime + 's'}
        );

        return accessJWT
        
    }

    // getCurrentToken = async () => {
    //     const storedToken = await redis.get(`access_jwt_token:${this.userId}`);
    //     return storedToken ? storedToken : ''
    // } 

    // @TODO - think about having a singular false return an a better return in the catch
    validateToken = async (token: string, secretKey: string) => {
        const tokenVersion = await getTokenVersion(this.userId)

        try{
            const decodedPayload: CustomPayload = await verifyJWT(token, secretKey)
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

    // invalidateToken = async () => {
        
    // }

}