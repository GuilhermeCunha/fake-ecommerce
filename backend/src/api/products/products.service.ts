import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product, ProductDocument } from 'src/mongoose/schemas/Product.schema';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';
import { PaginationDTO } from 'src/shared/pagination/dto/pagination.dto';
import { SortOptions } from 'src/shared/types';

export interface IGetManyProducts {
  filters?: FilterQuery<ProductDocument>;
  sorts?: SortOptions<Product>;
  pagination?: PaginationDTO;
}

export interface IGetOneProduct {
  filters?: FilterQuery<ProductDocument>;
}
export interface IUpdateOneProduct {
  filters?: FilterQuery<ProductDocument>;
  data: Partial<Product>;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async getMany({ pagination, filters, sorts }: IGetManyProducts = {}): Promise<
    PaginatedResponse<Product> | Product[]
  > {
    let query = this.productModel.find(filters);

    query.sort(sorts);
    if (pagination) {
      const total = await this.productModel.countDocuments(filters);
      query = query.skip(pagination.skip).limit(pagination.limit);

      return {
        pagination: {
          skip: pagination.skip,
          limit: pagination.limit,
          total,
        },
        results: await query,
      };
    }

    return await query;
  }

  async getOne({ filters }: IGetOneProduct): Promise<Product> {
    const query = this.productModel.findOne(filters);

    const product = await query.exec();

    if (!product)
      throw new HttpException('Product não encontrado', HttpStatus.NOT_FOUND);

    return product;
  }

  async create(data: Product): Promise<ProductDocument> {
    return this.productModel.create(data);
  }

  async createMany(data: Product[]): Promise<ProductDocument[]> {
    return this.productModel.create(data);
  }

  async updateOne({
    filters,
    data,
  }: IUpdateOneProduct): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate(
      {
        ...filters,
      },
      {
        $set: data,
      },
      {
        new: true,
      },
    );
  }

  async deleteById(_id: string): Promise<void> {
    await this.productModel.deleteOne({
      _id: _id,
    });
  }
}
