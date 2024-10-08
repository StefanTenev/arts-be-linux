import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

import { Sex, DietGoal, ActivityLevel } from "./enums";
import { User } from "../users/User"

// @TODO - need to make these not null - see how and think about any other data tables which should not be null
@Entity()
// @Unique(["email", "username"])
export class DietMeasurement {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    height!: number

    @Column()
    weight!: number

    @Column()
    age!: number

    @Column()
    sex!: Sex

    @Column()
    diet_goal!: DietGoal

    @Column()
    activity_level!: ActivityLevel

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()  // Ensures the foreign key is in the GoalEyes table
    user!: User;

}
