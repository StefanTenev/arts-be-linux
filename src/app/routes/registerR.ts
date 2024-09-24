import express from 'express'
import { body, validationResult } from 'express-validator'
import { Response, Request } from 'express';
import { registerC } from '../controllers/users/users'

const router = express.Router();

router.post(
    '/',
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
        
        await registerC(req, res);

    }
);