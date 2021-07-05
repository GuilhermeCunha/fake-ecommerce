import { ProductSource } from './ProductSource.interface';

export type Product = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  source: ProductSource;
  isFavorite: boolean;
};
