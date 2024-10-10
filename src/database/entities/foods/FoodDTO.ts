import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { isNotEmptyErr, isNumberErr, isStringErr } from "../DTOErrors";

// const id = "Id"
const name = "Name"
const carbohydrates = "Carbohydrates"
const proteins = "Proteins"
const fats = "Fats"
const calories = "Calories"
// const gi = "Gi"


export default class FoodDTO {

    // remember that id is automatically generated...
    // @IsString({ message: isStringErr(id) })
    // @IsNotEmpty({ message: isNotEmptyErr(id) })
    id!: string;

    @IsString({ message: isStringErr(name) })
    @IsNotEmpty({ message: isNotEmptyErr(name) })
    name!: string;

    @IsNumber({}, { message: isNumberErr(carbohydrates) })
    @IsNotEmpty({ message: isNotEmptyErr(carbohydrates) })
    carbohydrates!: number;

    @IsNumber({}, { message: isNumberErr(proteins) })
    @IsNotEmpty({ message: isNotEmptyErr(proteins) })
    proteins!: number;

    @IsNumber({}, { message: isNumberErr(fats) })
    @IsNotEmpty({ message: isNotEmptyErr(fats) })
    fats!: number;

    // @TODO - implement saturated/unsaturated fats later one
    // saturated_fats: number

    // unsaturated_fats: number

    @IsNumber({}, { message: isNumberErr(calories) })
    @IsNotEmpty({ message: isNotEmptyErr(calories) })
    calories!: number

    // @TODO - think of implementation for gi
    // @IsNumber({}, { message: isNumberErr(gi) })
    // @IsNotEmpty({ message: isNotEmptyErr(gi) })
    gi!: number | null

}
// @OneToMany(() => UserFoodList, (userFoodList) => userFoodList.food)
// userFoodsList: UserFoodList[] = [];
