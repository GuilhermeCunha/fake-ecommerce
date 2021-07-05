import { IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/mongoose/schemas/Product.schema';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';
import { SortAttribute, TransformIfDefined } from 'src/shared/transforms';
import { getStringSearchRegex } from 'src/mongoose/utils';

export class ListProducts extends PaginatedResponse<Product> {
  @ApiProperty({
    type: [Product],
  })
  results: Product[];
}
export class FilterProductsDTO {
  @ApiProperty({
    type: String,
    required: false,
  })
  @TransformIfDefined(({ value }) => getStringSearchRegex(value))
  @IsOptional()
  @IsObject()
  name?: any;
}

export class SortProductsDTO {
  @SortAttribute({ name: 'createdAt' })
  createdAt?: string;
}
