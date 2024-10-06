import { Request, Response } from "express";
// import UserController from "./users/userController";
import userRepository from "../../database/entities/users/userRepository";
import bcrypt from 'bcrypt';
import CSRFT from "../services/auth/CSRFT";
import AccessJWT from "../services/auth/accessJWT";
import RefreshJWT from "../services/auth/refreshJWT";
import { getRefreshJWTHolder } from "../services/auth/getTokenHolder";

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

    const csrft = new CSRFT(existingUser.id)
    const accessJWT = new AccessJWT(existingUser.username, existingUser.id)
    const refreshJWT = new RefreshJWT(existingUser.username, existingUser.id)
    
    const accessToken = await accessJWT.generateToken();
    const refreshToken = await refreshJWT.generateToken();
    const csrfToken = await csrft.generateToken() 

    return res.status(200) 
        .cookie(
            'refreshJWT', 
            refreshToken, 
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
                accessToken,
                csrfToken,
                user: {
                    id: existingUser.id,
                    email: existingUser.email
                },
            });
    
}

// @ TODO - consider logic for validating the user...
export const logoutUser = async (req: Request, res: Response) => {

    const { userId } = req.body;

    await new CSRFT(userId).invalidateToken()
    // await new RefreshJWT(username, userId).invalidateToken(res)
    // await new AccessJWT(username, userId).invalidateToken()

    // res.clearCookie('refreshJWT', {path:  '/'})
    res.status(200).json({ message: 'Logged out successfully'});

}

export const session = async (req: Request, res: Response) => {
    console.log(req.cookies)
    const refreshToken = req.cookies["refreshJWT"]

    if(!refreshToken){
        return res.status(401).json({ message: "No refresh token found." })
    }

    const username = await getRefreshJWTHolder(refreshToken);


    const existingUser = await userRepository().findOne({
        where: { username: username }
    })


    if(existingUser){
        const newCSRFT = new CSRFT(existingUser.id).generateToken()
        const newAccessJWT = new AccessJWT(username, existingUser.id).generateToken()
        const newRefreshJWT = new RefreshJWT(username, existingUser.id).generateToken()

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
                newCSRFT, 
                newAccessJWT,
                user: {
                    username: existingUser.username,
                    id: existingUser.id,
                    email: existingUser.email
                },
            })
    }

    return res.status(404).json({ message: "fak yo faqer"})

}