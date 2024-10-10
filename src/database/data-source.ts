import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/users/User"
import { Food } from "./entities/foods/Food"
import { UserFoodList } from "./entities/userFoodLists/UserFoodList"

const entities = [
    User,
    Food,
    UserFoodList
]

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user1",
    password: "password",
    database: "test",
    synchronize: false,
    logging: false,
    // ** remember to change paths if either this, or the entities/migration folders are changed **
    entities: entities,
    migrations: [__dirname + "/migrations/**/*.ts"],
    subscribers: [],
    // "ts-node": {
    // transpileOnly: true
    // }
})
