import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

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
    id!: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password_hash: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
