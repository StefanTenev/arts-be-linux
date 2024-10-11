import dietMeasurementRepository from "@database/entities/dietMeasurements/dietMeasurementsRepository";
import dietService from "./dietService";

class DietMeasurementService {

    getByUserId = async (userId: string) => {
        const dietMeasurement = await dietMeasurementRepository.findOne({
            where: { user: { id: userId} }
        })

        return dietMeasurement
    }

    postMeasurement = async (measurementData: any) => {
        const dietMeasuremenet = await dietMeasurementRepository.save(measurementData)

        await dietService.calculateAndStore(measurementData)

        return dietMeasuremenet
    }

}

export default new DietMeasurementService()