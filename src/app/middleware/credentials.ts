import { Request, Response, NextFunction } from "express"

export const credentialsMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    //const origin = req.headers.origin;
    // console.log(origin)
    // console.log('HEADER BEFORE: ' ,res.header)
    res.header('Access-Controll-Allow-Credentials', 'true')
    // console.log('HEADER AFTER: ', res.header)
    next()
}