import { Request, Response, NextFunction } from 'express';
import validateJWT from '../services/auth2/validateJWT';
import generateJWT from '../services/auth2/generateJWT';
import incrementTokenVersion from '../services/auth/incrementTokenVersion';

//@TODO - this whole faking mess needs a fix

export const vJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  // get current tokens
  const refreshToken: string | undefined = req.cookies['refreshJWT']
  const accessToken: string | undefined = req.header('Authorization')?.replace('Bearer ', '');

  if(accessToken){


    // if access token is present => valdiate and go to next 
    try{

      const isAccessJWTVerified = await validateJWT(accessToken, process.env.ACCESS_TOKEN_SECRET as string)

      if(isAccessJWTVerified){
        return next()
      }
      return res.status(401).json({ message: 'Invalid access and refresh token.' }); // Invalid token

    }
    catch(err){

      return res.status(500).json({ message: 'internal server error' }); // Invalid token
    }

  // if there's no access token => check for refresh token
  }else if(refreshToken){

    // if refresh token is present => valdiate and generate new tokens 
    try{
      const isRefreshJWTVerified = await validateJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
  
      if(isRefreshJWTVerified){

        // increment to version the token 
        await incrementTokenVersion(isRefreshJWTVerified.id)
        const refreshJWTExpire = 604800 // 7 days in sec
        const accessJWTExpire = 900 // 15 min in sec
        const newRefreshToken = await generateJWT(refreshJWTExpire, isRefreshJWTVerified.id)
        const newAccessToken = await generateJWT(accessJWTExpire, isRefreshJWTVerified.id)
        
        req.newRefreshToken = newRefreshToken
        req.newAccessToken = newAccessToken
        req.user = isRefreshJWTVerified
        return next()
      }
    }
    catch(err){
      return res.status(500).json({ message: 'internal server error' }); // Invalid token
    }

  }

  if (!accessToken && !refreshToken) {
    
    return res.status(401).json({ message: 'Access denied. No access JWT provided.', jwt: 'None' });
  }

};
