import { Module } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}