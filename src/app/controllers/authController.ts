import { Request, Response } from "express";
// import UserController from "./users/userController";
import userRepository from "../../database/entities/users/userRepository";
import bcrypt from 'bcrypt';
import { getJWTs } from "../services/auth/getJWTs";

// export const registerUser = async (req: Request, res: Response) => {
//     const userController = new UserController();
//     await userController.post(req, res);
// }

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await userRepository().findOne({
        where: { username }
    });

    if(!existingUser){
        console.log("USER DOES NOT EXIST!")
        return res.status(404)
            .json({ message: `User ${username} does not exist.` });
    }
    console.log("USER EXISTS!", existingUser)
    const isMatch = await bcrypt.compare(password, existingUser.password_hash);

    if(!isMatch){
        console.log("INCORRECT PASSWORD: ", isMatch)
        return res.status(401)
        .json({ message: "Invalid credentials." });
    }
    console.log("CORRECT PASSWORD: ", isMatch)
    // @TODO - Check if the username auto assigns the same property in the service
    const { accessToken, refreshToken } = getJWTs(username) 

    return res.status(200)
        .cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
        .json({ message: `User ${username} authenticated successfully.`, accessToken });
    
}