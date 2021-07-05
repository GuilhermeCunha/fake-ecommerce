import { Module } from '@nestjs/common';
import { Product, ProductSchema } from 'src/mongoose/schemas/Product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
const mongooseFeatures = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);
@Module({
  imports: [mongooseFeatures, LoggerModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [mongooseFeatures, ProductsService],
})
export class ProductsModule {}
