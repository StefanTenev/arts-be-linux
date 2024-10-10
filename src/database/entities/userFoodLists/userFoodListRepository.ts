import { AppDataSource } from "../../data-source";
import { UserFoodList } from "./UserFoodList";

const userFoodListRepository = AppDataSource.getRepository(UserFoodList)

export default userFoodListRepository