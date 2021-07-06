import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { toMongooseId } from 'src/mongoose/utils';
import { FirebaseAuth } from 'src/shared/auth/firebase/decorators/firebase-auth.decorator';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';
import { PaginationDTO } from 'src/shared/pagination/dto/pagination.dto';
import { Product } from 'src/mongoose/schemas/Product.schema';
import { ProductsService } from './products.service';
import {
  FilterProductsDTO,
  ListProducts,
  SortProductsDTO,
} from './dto/list-products.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { PatchProductDTO } from './dto/patch-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { SeedsService } from 'src/mongoose/seeds/seeds.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private seedsService: SeedsService,
  ) {}

  @ApiOkResponse({
    description: 'Productes obtido(a)s com sucesso',
    type: ListProducts,
  })
  @Get('/')
  async getMany(
    @Query() filters: FilterProductsDTO = {},
    @Query()
    pagination: PaginationDTO,
    @Query()
    sorts: SortProductsDTO,
  ): Promise<PaginatedResponse<Product>> {
    const product = await this.productsService.getMany({
      filters,
      pagination,
      sorts,
    });

    return product as PaginatedResponse<Product>;
  }

  @ApiOkResponse({
    description: 'Product obtido(a) com sucesso.',
    type: Product,
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getOne({
      filters: {
        _id: toMongooseId(id),
      },
    });
  }

  @ApiCreatedResponse({
    description: 'Product cadastrado(a) com sucesso.',
    type: Product,
  })
  @Post('/')
  async store(@Body() dto: CreateProductDTO): Promise<Product> {
    return await this.productsService.create(dto);
  }

  @ApiOkResponse({
    description: 'Product atualizado(a) com sucesso.',
    type: Product,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDTO,
  ): Promise<Product> {
    return await this.productsService.updateOne({
      filters: {
        _id: toMongooseId(id),
      },
      data: dto,
    });
  }

  @ApiOkResponse({
    description: 'Product atualizado(a) com sucesso.',
    type: Product,
  })
  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: PatchProductDTO,
  ): Promise<Product> {
    return await this.productsService.updateOne({
      filters: {
        _id: toMongooseId(id),
      },
      data: dto,
    });
  }

  @ApiOkResponse({
    description: 'Product deletado(a) com sucesso.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteById(id);
  }

  @ApiCreatedResponse({
    description: 'Produtos randômicos criados com sucesso.',
  })
  @Post('/seeds')
  async seeds(): Promise<void> {
    return await this.seedsService.createProductSeeds();
  }
}
