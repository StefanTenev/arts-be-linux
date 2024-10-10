import { Request, Response } from "express";
import userRepository from "../../database/entities/users/userRepository";
import bcrypt from 'bcrypt';
import CSRFT from "../services/auth/CSRFT";

import generateJWT from "../services/auth2/generateJWT";
import incrementTokenVersion from "@services/auth/incrementTokenVersion";

export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const existingUser = await userRepository().findOne({
        where: { username }
    });

    if(!existingUser){
        return res.status(404)
            .json({ message: `User ${username} does not exist.` });
    }

    const correctPassword = await bcrypt.compare(password, existingUser.password_hash);

    if(!correctPassword){
        return res.status(401)
        .json({ message: "Invalid credentials." });
    }

    const refreshJWTExpire = 604800 // 7 days in sec
    const accessJWTExpire = 900 // 15 min in sec

    const newRefreshJWT = await generateJWT(refreshJWTExpire, existingUser.id)
    const newAccessJWT = await generateJWT(accessJWTExpire, existingUser.id)

    const newCSRFT = await new CSRFT(existingUser.id).generateToken()

    return res.status(200) 
        .cookie(
            'refreshJWT', 
            newRefreshJWT, 
            { 
                httpOnly: true, 
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'none',
                path: "/",
                secure: true,
            }
        )
        .json({ 
                message: `User ${username} authenticated successfully.`,
                newAccessJWT,
                newCSRFT,
                user: {
                    id: existingUser.id,
                    email: existingUser.email,
                    username: existingUser.username
                }
            });
    
}

// @ TODO - consider logic for validating the user...
// @TODO - consider if we need to increment the token version here
export const logoutUser = async (req: Request, res: Response) => {

    const { userId } = req.body;

    await new CSRFT(userId).invalidateToken()
    // await new RefreshJWT(username, userId).invalidateToken(res)
    // await new AccessJWT(username, userId).invalidateToken()
    
    await incrementTokenVersion(userId)
    res.clearCookie('refreshJWT', {path:  '/'})
    res.status(200).json({ message: 'Logged out successfully'});

}

export const session = async (req: Request, res: Response) => {
    const newRefreshJWT = req.newRefreshToken
    const newAccessJWT = req.newAccessToken
    const user = req.user

    if(user){
        const newCSRFT = new CSRFT(user.id).generateToken()

        return res.status(200)
        .cookie(
            'refreshJWT', 
            newRefreshJWT, 
            { 
                httpOnly: true, 
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'none',
                path: "/",
                secure: true,
            }
        )
        .json({ 
            message:"successfully retrieved session", 
            csrfToken: newCSRFT, 
            accessToken: newAccessJWT,
            user,
        })
    }


    return res.status(404).json({ message: "fak yo faqer"})

}