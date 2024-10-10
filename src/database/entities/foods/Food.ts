import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UserFoodList } from "../userFoodLists/UserFoodList"

@Entity()
export class Food {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column({ type: "float" })
    carbohydrates!: number

    @Column({ type: "float" })
    proteins!: number

    @Column({ type: "float" })
    fats!: number

    // @TODO - think of implentation for saturated/unsaturated fats later on

    // @Column({ type: "float" })
    // saturated_fats!: number

    // @Column({ type: "float" })
    // unsaturated_fats!: number

    @Column({ type: "float" })
    calories!: number

    // @TODO - think of implementation for gi later on
    @Column({ type: "float", nullable: true })
    gi!: number | null

    @OneToMany(() => UserFoodList, (userFoodList) => userFoodList.food)
    userFoodsList!: UserFoodList[]
    
}


