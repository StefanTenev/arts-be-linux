import { AppDataSource } from "../../data-source";
import { User } from "./User";

export default function userRepository() {
    return AppDataSource.getRepository(User)
}