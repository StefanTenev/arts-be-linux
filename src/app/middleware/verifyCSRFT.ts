import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';

import CSRFT from '../services/auth/CSRFT';

interface CSRFTokenRequest extends Request {
    headers: IncomingHttpHeaders & {
        'csrf-token'?: string | undefined;
    };
}

export const vCSRFTMiddleware = async (req: CSRFTokenRequest, res: Response, next: NextFunction) => {
    // header('CSRFT')
    const csrfToken = req.headers['csrf-token']
    const userId = req.body.id

    const csrft = new CSRFT(userId)

    if (!csrfToken) {
        return res.status(401).json({ message: 'Access denied. No csrf token provided.' });
    }

    try{
        const isValid = await csrft.validateToken(csrfToken)
    
        if(isValid){
           return next();
        }
        return res.status(400).json({ message: 'Invalid CSRF token.', csrfToken: csrfToken });
    }
    catch(error){
        return res.status(500).json({ message: 'Internal server error.', error: error });
    }
};

