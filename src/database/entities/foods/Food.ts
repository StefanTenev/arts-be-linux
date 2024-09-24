import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Food {

    constructor( 
        name: string,
        carbohydrates: number | null,
        proteins: number | null,
        fats: number | null,
        saturated_fats: number | null,
        unsaturated_fats: number | null,
        calories: number | null,
        gi: number | null,

    ) {
        this.name = name
        this.gi = gi
        this.carbohydrates = carbohydrates
        this.fats = saturated_fats !== null && unsaturated_fats !== null ? saturated_fats + unsaturated_fats 
            : fats !== null ? fats
            : null
        this.saturated_fats = saturated_fats
        this.unsaturated_fats = unsaturated_fats
        this.proteins = proteins
        this.calories = fats !== null && carbohydrates !== null && proteins !== null ? fats * 9 + (proteins + carbohydrates) * 4
            : calories !== null ? calories 
            : null
    }

    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column()
    name: string

    @Column({ type: "float", nullable: true })
    carbohydrates: number | null

    @Column({ type: "float", nullable: true })
    proteins: number | null

    @Column({ type: "float", nullable: true })
    fats: number | null

    @Column({ type: "float", nullable: true })
    saturated_fats: number | null

    @Column({ type: "float", nullable: true })
    unsaturated_fats: number | null

    @Column({ type: "float", nullable: true })
    calories: number | null

    @Column({ type: "float", nullable: true })
    gi: number | null
    
}
