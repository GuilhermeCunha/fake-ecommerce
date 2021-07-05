import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from 'class-transformer';
import { IsIn, IsOptional, ValidateIf } from 'class-validator';
import { SORT_VALUES } from '../types';

export interface ExcludeIfOptions {
  ignoreValidation: boolean;
}
export function ExcludeIf<T = any>(
  excludeCondition: (obj: T) => boolean,
  options?: ExcludeIfOptions,
): any {
  const transformDecorator = Transform(({ value, obj }) => {
    if (excludeCondition(obj)) return undefined;
    return value;
  });

  if (options?.ignoreValidation) {
    const validatorDecorator = ValidateIf((obj) => !excludeCondition(obj));
    return applyDecorators(transformDecorator, validatorDecorator);
  }

  return applyDecorators(transformDecorator);
}

export function TransformIfDefined(
  transformFn: (params: TransformFnParams) => any,
): any {
  return Transform((values) => {
    if (values.value !== undefined) {
      return transformFn(values);
    }
    return values.value;
  });
}

export interface ISortAttribute {
  name: string;
  prefix?: string;
}
export function SortAttribute({ name, prefix = 'sort-' }: ISortAttribute): any {
  return applyDecorators(
    Exclude(),
    Expose({
      name: `${prefix}${name}`,
    }),
    ApiProperty({
      name: `${prefix}${name}`,
      enum: SORT_VALUES,
      required: false,
    }),
    IsOptional(),
    TransformIfDefined(({ value }) => {
      const v = SORT_VALUES.includes(value)
        ? Number(value as string)
        : undefined;
      return v;
    }),
    IsIn(SORT_VALUES),
  );
}
