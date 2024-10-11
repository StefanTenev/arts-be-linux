
import dietRepository from "@database/entities/diets/dietRepository"

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