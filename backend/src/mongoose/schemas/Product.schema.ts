import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Product {
  @ApiProperty()
  _id?: Types.ObjectId;

  @ApiProperty({
    required: true,
    type: String,
    maxLength: 50,
  })
  @Prop({
    type: String,
    required: true,
    maxlength: 50,
  })
  name: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @ApiProperty({
    required: false,
    type: String,
    maxLength: 120,
  })
  @Prop({
    type: String,
    required: false,
    maxlength: 120,
  })
  shortDescription?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @Prop({
    type: String,
    required: false,
  })
  imageUrl: string;

  @ApiProperty()
  @Prop({
    required: false,
    default: () => Date.now(),
  })
  createdAt?: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
