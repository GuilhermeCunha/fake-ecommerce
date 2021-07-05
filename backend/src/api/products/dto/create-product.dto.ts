import {
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    required: true,
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    required: false,
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsUrl()
  imageUrl: string;
}
