import jwt, { JwtPayload } from 'jsonwebtoken';

//@TODO - explore using the promise verifyJWT in the middleware

// Define your custom payload interface
interface UsernameJWTPayload extends JwtPayload {
    username: string;
}

// Function to verify the JWT, wrapped to take the secret as an argument
const verifyJWT = (token: string, secret: string): Promise<UsernameJWTPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err); // Reject the promise on error
            } else {
                resolve(decoded as UsernameJWTPayload); // Resolve the promise with decoded payload
            }
        });
    });
};

// Export function to get the username from the refresh token
export const getRefreshJWTHolder = async (refreshToken: string): Promise<string> => {
    try {
        const payload = await verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        
        // Return the username if payload is valid
        return payload.username;
    } catch (err) {
        // Return false if there's an error (invalid token)
        return '';
    }
};
