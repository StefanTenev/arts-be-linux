import { AppDataSource } from "@database/data-source";
import { DietMeasurement } from "./DietMeasurement";

const dietMeasurementRepository = AppDataSource.getRepository(DietMeasurement)

export default dietMeasurementRepository