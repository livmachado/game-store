import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity({ name: "tb_categories"})
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'A Descrição é Obrigatória. '})
    @Length(2, 1000, { message: "A Descrição deve ter entre 10 e 1000 caracteres" })
    @Column({ length: 1000, nullable: false })
    description: string;

    @OneToMany( () => Product, (product) => product.category)
    product: Product[];

}