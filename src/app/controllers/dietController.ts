import { Request, Response } from "express"
import dietService from "@services/dietService"

class DietController {

    getDietByUserId = async ( req: Request, res: Response ) => {

        const userId = req.body.userId

        const userDiet = await dietService.getDietByUserId(userId)

        return res.status(200).json({userDiet})

    }
}

export default new DietController()
