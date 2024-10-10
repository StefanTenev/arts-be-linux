import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

import { User } from "../users/User"

@Entity()
// @Unique(["email", "username"])
export class Diet {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({default: 0})
    calories: number = 0

    @Column()
    fats: number = 0

    @Column()
    proteins: number = 0

    @Column()
    carbohydrates: number = 0

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()  // Ensures the foreign key is in the GoalEyes table
    user!: User;

}
