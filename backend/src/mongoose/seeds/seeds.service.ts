import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import * as faker from 'faker';
import { Product } from '../schemas/Product.schema';
import { ProductsService } from 'src/api/products/products.service';
@Injectable()
export class SeedsService {
  constructor(private productsService: ProductsService) {}
  @Command({
    command: 'create:seeds',
    describe: 'create all seeds',
    autoExit: true,
  })
  async create() {
    console.log(`Criando seeds`);

    const products: Product[] = [...new Array(200)].map(() => {
      return {
        name: faker.commerce.productName(),
        imageUrl: faker.image.imageUrl(),
        price: Number(faker.commerce.price()),
        shortDescription: faker.commerce.productDescription().substring(0, 119),
      };
    });

    console.log({
      products: products.length,
      product: products[0],
    });

    await this.productsService.createMany(products);
  }
}
