import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product>{
    return this.productService.findById(id)
  }
  
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('name') name: string): Promise<Product[]>{
    return this.productService.findAllByName(name)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Promise<Product>{
    return this.productService.create(product);
  }
  
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: Product): Promise<Product>{
    return this.productService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.productService.delete(id)
  }

  @Get("/price/greater/:value")
  findByPriceGreaterThan(@Param("value") value: number) {
  return this.productService.findByPriceGreaterThan(value);
  }
  @Get("/price/less/:value")
  findByPriceLessThan(@Param("value") value: number) {
  return this.productService.findByPriceLessThan(value);
  }
}