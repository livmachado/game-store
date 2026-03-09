import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]>{
        return await this.categoryRepository.find();
    }

    async findById(id: number): Promise<Category>{
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    if(!category)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

    return category;
    }

    async findAllByDescription(description: string): Promise<Category[]>{
    return this.categoryRepository.find({
      where: {
        description: ILike(`%${description}%`)
      }
    })
    }

    async create(category: Category): Promise<Category>{
        return this.categoryRepository.save(category);
    }

    async update(category: Category): Promise<Category>{
    if(!category.id || category.id <=0){
      throw new HttpException("O ID do produto é inválido!",HttpStatus.BAD_REQUEST);
    } 

    
    await this.findById(category.id)
    return await this.categoryRepository.save(category);
    }


    async delete(id: number) : Promise<DeleteResult>{
    await this.findById(id);

    return this.categoryRepository.delete(id);
  }

}