import { Request, Response } from "express";
import { generateCsrfToken } from '../services/auth/csrfToken';

export const createToken = async (req: Request, res: Response ): Promise<Response> => {
    const csrfToken = await generateCsrfToken(req.body.userId)

    return res.status(200)
        .json({ csrfToken })
};
