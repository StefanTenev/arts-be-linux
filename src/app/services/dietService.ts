
import dietRepository from "@database/entities/diets/dietRepository"

import { DietMeasurement } from "@database/entities/dietMeasurements/DietMeasurement"
import { Sex, ActivityLevel, DietGoal } from "@database/entities/dietMeasurements/enums"

const calculateBMR = (weight: number, height: number, age: number, sexBMRDiff: number) => {
    return 10 * weight + 6.25 * height - 5 * age + sexBMRDiff
}

const calculateCaloricNeed = (BMR: number, activityLevel: ActivityLevel, weightGoals: DietGoal){

    // Total Daily Energy Expenditure
    let TDEE = 0;

    const expenditureMultipliers = {
        sedetary: 1.2,
        sparse: 1.375,
        fair: 1.55,
        high: 1.725,
        extreme: 1.9

    }

    // switch(activityLevel){
    //     case ActivityLevel.sedetary:
    //         TDDE = BMR * 1.2
    // }

}

const calculateCalories = (
    sex: DietMeasurement["sex"], 
    weight: DietMeasurement["weight"], 
    height: DietMeasurement["height"],
    age: DietMeasurement["age"],
    activityLevels: DietMeasurement["activity_level"], 
    weightGoals: DietMeasurement["diet_goal"]
) => {
    let BMR = 0;
    let sexBmrDiff = {
        M: 5,
        F: -161
    }

    if(sex === Sex.M){
        BMR = calculateBMR(weight, height, age, sexBmrDiff.M) 
    }else{
        BMR = calculateBMR(weight, height, age, sexBmrDiff.F) 
    }



    return BMR
}



class DietService {

    calculateAndStore = async (data: any) => {
        const result = data + 1

        await dietRepository.save(result)
    }

    getDietByUserId = async(userId: any) => {

        const userDiet = await dietRepository.findOne({
            where: {
                user: { id: userId}
            }
        })

        return userDiet

    }

}

export default new DietService()