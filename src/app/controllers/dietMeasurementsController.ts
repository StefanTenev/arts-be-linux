import { Request, Response } from "express"
import dietMeasurementService from "@services/dietMeasurementService"


class DietMeasurementsController {

    getMeasurementsByUserId = async ( req: Request, res: Response ) => {

        const userId = req.body.userId

        try {
            const data = await dietMeasurementService.getByUserId(userId)

            return res.status(200).json(data)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error when fetching user diet measurements"})
        }

    }

    postMeasurements = async ( req: Request, res: Response ) => {

        const measurementData = req.body

        try {
            const data = await dietMeasurementService.postMeasurement(measurementData)

            return res.status(201).json(data)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error when posting user diet measurements"})
        }

    } 

}

export default new DietMeasurementsController()