import { AppDataSource } from "@database/data-source";
import { Food } from "./Food";

const foodRepository = () => {
    return AppDataSource.getRepository(Food)
}

export default foodRepository

