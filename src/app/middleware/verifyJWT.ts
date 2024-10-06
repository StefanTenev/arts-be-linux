import { Request, Response, NextFunction } from 'express';
import AccessJWT from 'app/services/auth/accessJWT';
import RefreshJWT from 'app/services/auth/refreshJWT';
import jwt, {JwtPayload} from 'jsonwebtoken';


import verifyJWT from 'app/services/auth/jwtVerifyWrapper';


//@TODO - this whole faking mess needs a fix

interface customRequest extends Request {
    // user: JwtPayload | undefined
  newAccessToken: string
  newRefreshToken: string
}

export const vJWTMiddleware = async (req: customRequest, res: Response, next: NextFunction) => {
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

  if(accessToken){

    try{
      await verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      return next()
    }
    catch(err){
      return res.status(401).json({ message: 'Invalid access token.' }); // Invalid token
    }

  }else if(refreshToken){
    try{
      await verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
      const newRefreshToken = await refreshJWT.generateToken()
      const newAccessToken = await accessJWT.generateToken()
      req.newRefreshToken = newRefreshToken
      req.newAccessToken = newAccessToken
      return next()
    }
    catch(err){
      return res.status(401).json({ message: 'Invalid refresh token.' }); // Invalid token
    }
  }

  // if(!accessToken && refreshToken){

  //   //@TODO - have to check if this return actually returns a response out of the middleware, or just out of the jwt verify (not sure how the jwt.verify works fully)
    
    // try{
    //   await verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
    //   accessToken = await accessJWT.generateToken()
    //   req.accessToken = accessToken
    //   return next()
    // }
    // catch(err){
    //   return res.status(401).json({ message: 'Invalid refresh token.' }); // Invalid token
    // }

  // }

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: 'Access denied. No access JWT provided.', jwt: 'None' });
  }

};
