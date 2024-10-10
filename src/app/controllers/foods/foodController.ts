import { Request, Response } from "express";
import foodRepository from "@database/entities/foods/foodRepository";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import FoodDTO from "@database/entities/foods/FoodDTO";

import { Food } from "@database/entities/foods/Food";
import { ValidationError } from "class-validator";

export const getAllFoods = async ( _req: Request, res: Response ) => {
    const foods: Food[] = await foodRepository().find();
    return res.json(foods)
}

export const getFoodById = async ( req: Request, res: Response ) => {
  const food: Food | null = await foodRepository().findOne({
    where: {id: req.params.foodId}
  });
  return res.json(food)
}

export const getFoodsByName = async ( req: Request, res: Response ) => {
  const food: Food[] | null = await foodRepository().find({
    where: {id: req.params.foodName}
  });
  return res.json(food)
}

// @TODO - MUST VALIDATE/CONVERT INPUT TYPES!

export const postFood = async ( req: Request, res: Response ) => {

    const foodDTO: FoodDTO = plainToClass(FoodDTO, req.body)

    const errors: ValidationError[] = await validate(foodDTO);
    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    const food = Object.assign(new Food(), foodDTO)

    try {
      await foodRepository().save(food)

      return res.status(201).json({
          message: 'Food created successfully',
          food
      });
    }
    catch(err){
      return res.status(500).json({ message: "Internal server error when posting food" })
    }

}


export const putFood = async ( req: Request, res: Response ) => {

  const food: Food | null = await foodRepository().findOne({
    where: {id: req.body.foodId}
  })

  if(!food){
    return res.status(404)
      .json({ message: "Failed to edit food - food not found" })
  }
  const foodObj = {
    ...food, ...req.body
  }

  const foodDTO: FoodDTO = plainToClass(FoodDTO, foodObj)

  const errors: ValidationError[] = await validate(foodDTO);
  if (errors.length > 0) {
    return res.status(400).json(errors)
  }

  const editedFood = Object.assign(new Food(), foodDTO)

  try {
    foodRepository().merge(food, editedFood)
    await foodRepository().save(food)

    return res.status(200)
      .json({ message: "Food updated successfully", food })
  }
  catch(err){
    return res.status(500)
      .json({ message: "Internal server error when updating food" })
  }

}


export const deleteFood = async ( req: Request, res: Response ) => {

  const food: Food | null = await foodRepository().findOne({
    where: {id: req.body.foodId}
  })

  if(!food){
    return res.status(404)
      .json({ message: "Failed to delete food - food not found" })
  }

  try {
    await foodRepository().remove(food)
    return res.status(204)
      .json({ message: `Food: ${food.name} deleted successfully` })
  }
  catch(err) {
    return res.status(500)
      .json({ message: "Internal server error when trying to delete food" })
  }

}