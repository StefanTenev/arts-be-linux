import { Request, Response } from "express";
// import UserController from "./users/userController";
import userRepository from "../../database/entities/users/userRepository";
import bcrypt from 'bcrypt';
import CSRFT from "../services/auth/CSRFT";
import AccessJWT from "../services/auth/accessJWT";
import RefreshJWT from "../services/auth/refreshJWT";


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await userRepository().findOne({
        where: { username }
    });
    // console.log('Request body: ', req.body, 'username:  ', username, existingUser,
    //     "request headers: ", req.headers
    // )

    if(!existingUser){
        console.log("USER DOES NOT EXIST!")
        return res.status(404)
            .json({ message: `User ${username} does not exist.` });
    }
    console.log("USER EXISTS!")
    const isMatch = await bcrypt.compare(password, existingUser.password_hash);

    if(!isMatch){
        console.log("INCORRECT PASSWORD: ", isMatch)
        return res.status(401)
        .json({ message: "Invalid credentials." });
    }

    const csrft = new CSRFT(existingUser.id)
    const accessJWT = new AccessJWT(existingUser.username, existingUser.id)
    const refreshJWT = new RefreshJWT(existingUser.username, existingUser.id)
    
    console.log("CORRECT PASSWORD: ", isMatch)
    // @TODO - Check if the username auto assigns the same property in the service
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
                path: "/login"
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

// @TODO - consider not-sending csrft/access jwt here and jsut keeping it to the front end (to get rid of excess code)
// @ TODO - consider logic for validating the user...
export const logoutUser = async (req: Request, res: Response) => {

    const {username, userId} = req.body;

    new CSRFT(userId).invalidateToken()
    new RefreshJWT(username, userId).invalidateToken(res)
    new AccessJWT(username, userId).invalidateToken()

      res.status(200).json({ message: 'Logged out successfully', CSRFT: '', accessJWT: ''});

}