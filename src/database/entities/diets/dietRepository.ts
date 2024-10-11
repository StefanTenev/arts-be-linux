import { AppDataSource } from "@database/data-source";
import { Diet } from "./Diet";

const dietRepository = AppDataSource.getRepository(Diet)

export default dietRepository