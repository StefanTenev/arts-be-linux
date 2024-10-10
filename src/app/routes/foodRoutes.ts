import * as foodController from '../controllers/foods/foodController'

import express from "express";

const foodRoutes = express.Router();



foodRoutes.get('/', foodController.getAllFoods);
foodRoutes.get('/:foodId', foodController.getFoodById);
foodRoutes.get('/:foodName', foodController.getFoodsByName);

foodRoutes.post('/', foodController.postFood);
foodRoutes.put('/', foodController.putFood);
foodRoutes.delete('/', foodController.deleteFood)

export default foodRoutes 