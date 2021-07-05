import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export const DEFAULT_LIMIT = 10;
export const DEFAULT_SKIP = 0;

export class PaginationDTO {
  @ApiProperty({
    type: Number,
    required: false,
    default: DEFAULT_SKIP,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return DEFAULT_SKIP;
  })
  skip: number = DEFAULT_SKIP;

  @ApiProperty({
    type: Number,
    required: false,
    default: DEFAULT_LIMIT,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return DEFAULT_LIMIT;
  })
  limit: number = DEFAULT_LIMIT;
}
