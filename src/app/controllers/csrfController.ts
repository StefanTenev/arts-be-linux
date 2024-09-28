import { Request, Response } from "express";
import CSRFT from "../services/auth/CSRFT";

export const createToken = async (req: Request, res: Response ): Promise<Response> => {
    //@TODO - need to rethink the way userId is sent in the body, maybe should be in a user object 

    const csrf = new CSRFT(req.body.userId)
    const csrfToken = await csrf.generateToken()

    return res.status(200)
        .json({ csrfToken })
};
