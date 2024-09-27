import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

interface customRequest extends Request {
    user: JwtPayload | undefined
}

export const vJWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'your_jwt_secret');
    (req as customRequest).user = verified as JwtPayload;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};
