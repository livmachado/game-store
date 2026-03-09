import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoryService } from "../../category/services/category.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) {}

    async findAll(): Promise<Product[]>{
        return await this.productRepository.find({
          relations: {
            category: true
          }
        });
    }

    async findById(id: number): Promise<Product>{
    const product = await this.productRepository.findOne({
      where: {
        id
      },
      relations:{
        category: true
      }
    })

    if(!product)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

    return product;
    }

    async findAllByName(name: string): Promise<Product[]>{
    return this.productRepository.find({
      where: {
        name: ILike(`%${name}%`)
      },
      relations:{
        category: true
      }
    })
    }

    async create(product: Product): Promise<Product>{

      await this.categoryService.findById(product.category.id)
        return this.productRepository.save(product);
    }

    async update(product: Product): Promise<Product>{
    if(!product.id || product.id <=0){
      throw new HttpException("O ID do produto é inválido!",HttpStatus.BAD_REQUEST);
    } 

    
    await this.findById(product.id)
    await this.categoryService.findById(product.category.id)
    return await this.productRepository.save(product);
    }


    async delete(id: number) : Promise<DeleteResult>{
    await this.findById(id);

    return this.productRepository.delete(id);
  }

}