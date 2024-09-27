import express from "express";
import UserController from "../controllers/users/userController";
import { vCSRFTMiddleware } from '../middleware/verifyCSRFT'

const userRoutes = express.Router();

const userController = new UserController();

userRoutes.get('/', userController.getAll);
userRoutes.get('/:username', userController.getOne);
userRoutes.post('/', userController.post);
userRoutes.put('/:username', userController.put);
userRoutes.delete('/:id', vCSRFTMiddleware, userController.delete)

export default userRoutes 