import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import { UserFoodList } from "../userFoodLists/UserFoodList"

@Entity()
@Unique(["email", "username"])
export class User {

    constructor( 
        username: string, 
        email: string, 
        password_hash: string 
    ) {
        this.username = username
        this.password_hash = password_hash
        this.email = email
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password_hash: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ default: 0 })
    tokenVersion: number = 0;

    @OneToMany(() => UserFoodList, (userFoodList) => userFoodList.user)
    userFoodsList: UserFoodList[] = [];
}
