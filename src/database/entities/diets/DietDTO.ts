import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isNotEmptyErr, isNumberErr, isStringErr } from "../DTOErrors";

const id = "Id";
const calories = "Calories";
const fats = "Fats";
const proteins = "Proteins";
const carbohydrates = "Carbohydrates";
const userId = "UserId"

export default class DietDTO {

    @IsString({ message: isStringErr(id) })
    @IsNotEmpty({ message: isNotEmptyErr(id) })
    id!: string;

    @IsNumber({}, { message: isNumberErr(calories) })
    @IsNotEmpty({ message: isNotEmptyErr(calories) })
    calories!: number;

    @IsNumber({}, { message: isNumberErr(fats) })
    @IsNotEmpty({ message: isNotEmptyErr(fats) })
    fats!: number;

    @IsNumber({}, { message: isNumberErr(proteins) })
    @IsNotEmpty({ message: isNotEmptyErr(proteins) })
    proteins!: number;

    @IsNumber({}, { message: isNumberErr(carbohydrates) })
    @IsNotEmpty({ message: isNotEmptyErr(carbohydrates) })
    carbohydrates!: number;

    @IsString({ message: isStringErr(userId) })
    @IsNotEmpty({ message: isNotEmptyErr(userId) })
    userId!: string;

}