import { Request, Response, NextFunction } from 'express';
import { validateCsrfToken } from '../services/auth/csrfToken';
import { IncomingHttpHeaders } from 'http';

interface CSRFTokenRequest extends Request {
    headers: IncomingHttpHeaders & {
        'csrf-token'?: string | undefined;
    };
}

export const vCSRFTMiddleware = async (req: CSRFTokenRequest, res: Response, next: NextFunction) => {
    // header('CSRFT')
    const csrfToken = req.headers['csrf-token']
    const userId = req.body.id

    if (!csrfToken) {
        return res.status(401).json({ message: 'Access denied. No csrf token provided.' });
    }

    try{
        const isValid = await validateCsrfToken(userId, csrfToken)
    
        if(isValid){
            next();
            return res.json({ message: "Authorised - valid CSRF token" })
        }
        return res.status(400).json({ message: 'Invalid CSRF token.', csrfToken: csrfToken });
    }
    catch(error){
        return res.status(500).json({ message: 'Internal server error.', error: error });
    }
};


// curl -X DELETE http://localhost:3000/user/baa73396-7721-4f61-893f-e312732d6b61 -H "Content-Type: application/json" -d '{ "id": "user123", "csrf": "7d2f804d99d7f3c20fee81341ebe83d284caa6210cfa5d87b018e25c4343ce5c" }'