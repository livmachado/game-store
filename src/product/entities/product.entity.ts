import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsUrl, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";
import { Platform } from '../enums/platform.enum';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'tb_products'})
export class Product{
    @PrimaryGeneratedColumn()
    id: number 


    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'O Nome é Obrigatório' })
    @Length(5, 100, { message: 'O Nome deve ter entre 5 e 100 caracteres' })
    @Column({ length: 100, nullable: false })
    name: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'A Descrição é Obrigatória' }) 
    @Length(10, 1000, { message: 'A Descrição deve ter entre 10 e 1000 caracteres' })
    @Column({ length: 1000, nullable: false })
    description: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    price: number

    @IsEnum(Platform)
    @Column({ type: 'enum',enum: Platform,nullable: false })
    platform: Platform;

    @IsNumber()
    @IsNotEmpty()
    @Column({ nullable: false })
    stock: number
    
    @IsUrl({}, { message: 'A imagem deve ser uma URL válida' })
    @Column({ nullable: true })
    imageUrl: string

    @ManyToOne( () => Category, (category) => category.product, {
        onDelete: "CASCADE"
    })
    category: Category;
}