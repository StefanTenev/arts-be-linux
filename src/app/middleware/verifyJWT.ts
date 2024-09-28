import { Request, Response, NextFunction } from 'express';
import AccessJWT from 'app/services/auth/accessJWT';
import RefreshJWT from 'app/services/auth/refreshJWT';
import jwt, {JwtPayload} from 'jsonwebtoken';

interface customRequest extends Request {
    user: JwtPayload | undefined
}

export const vJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies)
  const username: string | undefined = req.body.username;
  const userId: string | undefined = req.body.userId
  const refreshToken: string | undefined = req.cookies['refreshJWT']
  let accessToken: string | undefined = req.header('Authorization')?.replace('Bearer ', '');

  if(!username || !userId){
    return res.status(400).json({ message: 'Username or id not received'})
  }

  const accessJWT = new AccessJWT(username, userId)
  const refreshJWT = new RefreshJWT(username, userId)
  
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: 'Access denied. No access JWT provided.', jwt: 'None' });
  }

  if(accessToken){

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, async(err, payload) => {
      const isValid = await accessJWT.validateToken(accessToken)
      if (err || isValid) return res.status(401).json({ message: 'Invalid access token.' }); // Invalid token
      (req as customRequest).user = payload as JwtPayload;
      next();
    });

  }

  if(!accessToken && refreshToken){

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err) => {
      const isValid = await refreshJWT.validateToken(accessToken)
      if (err || isValid) return res.status(401).json({ message: 'Invalid refresh token.' }); // Invalid token
      console.log('REFRESH VERIFIED')
      // generate a new access token
      accessToken = await accessJWT.generateToken()
      res.status(200).json({ accessToken })
      next();
    });

  }

};
