import { IsString, IsNotEmpty } from "class-validator";
import { isStringErr, isNotEmptyErr } from "../DTOErrors";

const id = "Id"
const userId = "UserId"
const foodId = "FoodId"

export default class UserFoodListDTO {

    @IsString({ message: isStringErr(id) })
    @IsNotEmpty({ message: isNotEmptyErr(id) })
    id!: string;

    @IsString({ message: isStringErr(userId) })
    @IsNotEmpty({ message: isNotEmptyErr(userId) })
    userId!: string;

    @IsString({ message: isStringErr(foodId) })
    @IsNotEmpty({ message: isNotEmptyErr(foodId) })
    foodId!: string;

}