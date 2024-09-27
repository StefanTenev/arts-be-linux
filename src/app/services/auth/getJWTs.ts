import jwt from 'jsonwebtoken'

export const getJWTs = (headerVar: string) => {

    const accessToken = jwt.sign(
        { headerVar },
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn: '60s'}
    );
    const refreshToken = jwt.sign(
        { headerVar },
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: '1d'}
    );

    return { accessToken, refreshToken }
}

// 4814f20381e96a8db2bf3f5b24af1b9900c642dd203fe6cae7e61a43dc1d77b7

// curl -X POST http://localhost:3000/csrf/validate-token -H "Content-Type: application/json" -d '{"id": "user123", "token": "4814f20381e96a8db2bf3f5b24af1b9900c642dd203fe6cae7e61a43dc1d77b7"}'