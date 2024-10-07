import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'


interface CustomPayload extends JwtPayload {
    userId: string
    tokenVersion: number
}

const verifyJWT = (token: string, secretKey: string, options = {}): Promise<CustomPayload> => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, options, (err, decoded) => {
            if(err) reject(err)
            else resolve(decoded as CustomPayload)
        })
    })

}

export default verifyJWT