import { ApiProperty } from '@nestjs/swagger';

export class PaginationInfos {
  @ApiProperty()
  total: number;

  @ApiProperty()
  skip: number;

  @ApiProperty()
  limit: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({
    type: PaginationInfos,
  })
  pagination: PaginationInfos;

  results: T[];
}
