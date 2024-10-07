// types/express/index.d.ts
export {}

declare global {
  namespace Express {
    interface Request {
      newAccessToken?: any;
      newRefreshToken?: any;
      user?: {
        id: string,
        email: string,
        username: string
      }
    }
  }
}
