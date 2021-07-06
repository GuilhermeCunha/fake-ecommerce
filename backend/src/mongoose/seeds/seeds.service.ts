import { Command } from 'nestjs-command';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import * as faker from 'faker';
import { Product } from '../schemas/Product.schema';
import { ProductsService } from 'src/api/products/products.service';
@Injectable()
export class SeedsService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}
  @Command({
    command: 'create:seeds',
    describe: 'create all seeds',
    autoExit: true,
  })
  async createProductSeeds() {
    const products: Product[] = [...new Array(200)].map(() => {
      return {
        name: faker.commerce.productName(),
        imageUrl: faker.image.imageUrl(),
        price: Number(faker.commerce.price()),
        shortDescription: faker.commerce.productDescription().substring(0, 119),
      };
    });
    await this.productsService.createMany(products).then((created) => {
      console.log(`${created.length} successfully created products`);
    });
  }
}
