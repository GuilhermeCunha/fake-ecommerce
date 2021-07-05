import {
  IsString,
  IsOptional,
  MaxLength,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchProductDTO {
  @ApiProperty({
    required: false,
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    required: false,
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
