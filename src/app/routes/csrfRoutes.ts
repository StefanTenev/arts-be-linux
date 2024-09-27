import express from 'express';
// import { Request, Response } from 'express';
import { createToken } from '../controllers/csrfController';

const csrfRoutes = express.Router();

csrfRoutes.post('/generate-token', createToken)

// csrfRoutes.post('/validate-token', async (req: Request, res: Response) => {
//     const {id, token} = req.body
//     const isValid = await validateCsrfToken(id, token)
//     return res.json({ valid: isValid })
// })

export default csrfRoutes