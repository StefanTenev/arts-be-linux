import "reflect-metadata"
import { DataSource } from "typeorm"
//import { User } from "./entities//user/User"

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
    entities: [__dirname + "/entities/**/*.ts"],
    migrations: [__dirname + "/migrations/**/*.ts"],
    subscribers: [],
    // "ts-node": {
    // transpileOnly: true
    // }
})
