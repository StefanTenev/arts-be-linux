import * as userFoodListController from '../controllers/userFoodList/userFoodListController'

import express from "express";

const userFoodListRoutes = express.Router();



// userFoodListRoutes.get('/', userFoodListController.getAllUserFoodLists);
// userFoodListRoutes.get('/:listId', userFoodListController.getUserFoodListById);
userFoodListRoutes.get('/:userId', userFoodListController.getUserFoodListByUser);

userFoodListRoutes.post('/', userFoodListController.postUserFoodList);
// userFoodListRoutes.put('/', userFoodListController.putFood);
userFoodListRoutes.delete('/', userFoodListController.deleteUserFoodEntry)

export default userFoodListRoutes 