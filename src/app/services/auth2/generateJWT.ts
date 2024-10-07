import getTokenVersion from "../auth/getTokenVersion"
import jwt from 'jsonwebtoken'

const generateJWT = async(expireTime: number, userId: string) => {
    const tokenVersion = await getTokenVersion(userId)
    
    const refreshJWT = jwt.sign(
        { userId, tokenVersion },
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: expireTime + 's'}
    );

    return refreshJWT
}

export default generateJWT


// generateToken = async () => {
//     const tokenVersion = await getTokenVersion(this.userId)
    
//     if(!tokenVersion && tokenVersion !== 0){
//         return null
//     }

//     const expireTime = 604800 // seconds = 7 days
//     const refreshJWT = jwt.sign(
//         { userId: this.userId, tokenVersion },
//         process.env.REFRESH_TOKEN_SECRET as string,
//         {expiresIn: expireTime + 'd'}
//     );

//     return refreshJWT
// }