import { IsDateString, IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    name: string

    @IsEmail()
    @Column({length: 255, nullable: false })
    user: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false })
    password: string

    @Column({length: 5000 })
    userImage: string
    
    @IsDateString()
    @Column({type: "date"})
    dateOfBirth: Date;

}