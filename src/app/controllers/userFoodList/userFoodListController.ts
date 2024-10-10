import UserFoodListDTO from "@database/entities/userFoodLists/UserFoodListDTO";
import { UserFoodList } from "@database/entities/userFoodLists/UserFoodList";
import userFoodListRepository from "@database/entities/userFoodLists/userFoodListRepository";

import { validate } from "class-validator";
import { ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

import { Request, Response } from "express";


export const getAllUserFoodLists = async ( _req: Request, res: Response ) => {
    const userFoodLists: UserFoodList[] = await userFoodListRepository.find()
    return res.status(200)
        .json(userFoodLists)
}

export const getUserFoodListById = async ( req: Request, res: Response ) => {
    const userFoodList: UserFoodList | null = await userFoodListRepository.findOne({
        where: {id: req.params.userFoodListId}
    })
    
    if(!userFoodList){
        return res.status(200)
            .json(userFoodList)
    }

    return res.status(404)
        .json({ message: "Food list not found"})
}

export const getUserFoodListByUser = async ( req: Request, res: Response ) => {
    
    const userId = req.params.userId
    console.log(userId)
    try {
        console.log("SUCCESS!")
        const userFoodList: UserFoodList[] = await userFoodListRepository
            .createQueryBuilder('userFoodList')
            .leftJoinAndSelect('userFoodList.food', 'food')
            .where('userFoodList.user = :userId', { userId })
            .getMany()

        return res.status(200)
            .json(userFoodList.map( entry => {
                return { 
                    id: entry.id, 
                    food: entry.food 
                }
            }))
    }
    catch(err) {
        console.log("CATCH ERR!: ", err)
        return res.status(500)
            .json({ message: "Internal server error while trying to fetch user food entries"})
    }
    
}

export const postUserFoodList = async ( req: Request, res: Response ) => {
    const idk2 = {
        user: req.body.userId,
        food: req.body.foodId
    }
    const userFoodListDTO: UserFoodListDTO = plainToClass(UserFoodListDTO, idk2)

    const errors: ValidationError[] = await validate(userFoodListDTO)
    if(errors.length > 0) {
        return res.status(400).json(errors)
    }

    const userFoodList = Object.assign(new UserFoodList(), userFoodListDTO)
    // console.log()
    //const all = await userFoodListRepository.find()
    //console.log(all, userFoodList)
    try {
        const idk = await userFoodListRepository.save(userFoodList)
        console.log(idk)
        return res.status(200)
            .json({
                message: 'User food entry created successfully',
                userFoodList
            })
    }
    catch(err){
        console.log(err)
        return res.status(500)
            .json({ message: "Internal server error while trying to create a user food entry"})
    }

}


export const deleteUserFoodEntryByFoodId = async ( req: Request, res: Response ) => {

    const foodId = req.body.foodId
    const userFoodEntry: UserFoodList | null = await userFoodListRepository.findOne({
        where: { food: { id: foodId } }
    })

    if(!userFoodEntry){
        return res.status(404)
            .json({ message: "Failed to delete user food entry - food not found" })
    }

    try {
        await userFoodListRepository.remove(userFoodEntry)
        return res.status(204)
            .json({ message: "User food entry successfully deleted" })
    }
    catch(err){
        return res.status(500)
            .json({ message: "Internal server error while trying to delete user food entry" })
    }

}






