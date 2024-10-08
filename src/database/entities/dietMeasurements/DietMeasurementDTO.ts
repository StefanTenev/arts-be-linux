import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Max } from "class-validator";
import { Sex, DietGoal, ActivityLevel } from "./enums";

import { isStringErr, isNotEmptyErr, isEnumErr, isNumberErr, minErr, maxErr } from "../DTOErrors";



export default class DietMeasurementDTO {
    
    // height in cm
    @Min(130, { message: minErr("Height") })
    @Max(225, { message: maxErr("Height") })
    @IsNumber({}, { message: isNumberErr("Height") })
    @IsNotEmpty({ message: isNotEmptyErr("Height") })
    height!: number;

    // weight in kg
    @Min(40, { message: "Weight lower limit reached" })
    @Max(350, { message: "Weight upper limit reached" })
    @IsNumber({}, { message: 'Weight must be a number' })
    @IsNotEmpty({ message: 'Weight requires a value' })
    weight!: number;
    
    @Min(18, { message: "Age lower limit reached" })
    @Max(100, { message: "Age upper limit reached" })
    @IsNumber({}, { message: 'Age must be a number' })
    @IsNotEmpty({ message: 'Age requires a value' })
    age!: number;

    @IsEnum(Sex, { message: isEnumErr("Sex") })  // Enum validation
    @IsNotEmpty({ message: 'Sex requires a value' })
    sex!: Sex; 

    @IsEnum(DietGoal, { message: 'Invalid diet goal type' })  // Enum validation
    @IsNotEmpty({ message: 'Diet goal requires a value' })
    diet_goal!: DietGoal;

    @IsEnum(ActivityLevel, { message: 'Invalid activity level type' })  // Enum validation
    @IsNotEmpty({ message: 'Activity level requires a value' })
    activity_level!: ActivityLevel;  

    @IsString({ message: isStringErr("UserId")})
    @IsNotEmpty({ message: isNotEmptyErr("UserId") })
    userId!: string;

}
