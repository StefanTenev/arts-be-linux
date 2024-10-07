import express from 'express'
import UserController from '../controllers/users/userController';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';


import { 
    //registerUser, 
    loginUser,
    logoutUser,
    session
} from '../controllers/authController';
import { vJWTMiddleware } from '../middleware/verifyJWT';


const authRoutes = express.Router();

//authRoutes.post("/register", registerUser)

authRoutes.post(
    "/register",
    [
        body("username").notEmpty().withMessage("Username is required."),
        body("password").isLength({ min: 8 }).withMessage("Password needs to be at least 8 characters."),
        body('email').isEmail().withMessage("Invalid email.")
    ],
    async (req: Request, res: Response) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400)
                .json({ errors: errors.array() })
        }
        
        const userController = new UserController();

        await userController.post(req, res)

    }
);

authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

authRoutes.post("/session", vJWTMiddleware, session)

export default authRoutes