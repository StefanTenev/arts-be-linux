import verifyJWT from "../auth/jwtVerifyWrapper"
import userRepository from "../../../database/entities/users/userRepository";
import { JwtPayload } from "jsonwebtoken";

interface CustomPayload extends JwtPayload {
    userId: string
    tokenVersion: number
}


const validateJWT = async (jwt: string, secretKey: string) => {
    try{
        const decodedPayload: CustomPayload = await verifyJWT(jwt, secretKey) 

        const existingUser = await userRepository().findOne({
            where: { id: decodedPayload.userId }
        })

        if(existingUser){
            if(decodedPayload.tokenVersion !== existingUser.tokenVersion){
                return false
            }

            const user = {
                id: existingUser.id,
                email: existingUser.email,
                username: existingUser.username
            }
            
            return user
        }
        console.log("USER DOES NOT EXIST - ON JWT VALIDATION")
        return false
    }
    catch(err){
        console.log('ERROR WHEN VALIDATING ACCESS TOKEN / INVALID TOKEN')
        return false
    }
}

export default validateJWT
