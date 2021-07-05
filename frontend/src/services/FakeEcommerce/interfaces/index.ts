export class FakeEcommerceProduct {
  _id?: string;
  name: string;
  price: number;
  shortDescription?: string;
  imageUrl: string;
  createdAt?: number;
}

export type GetFakeEcommerceProductsFilters = {
  name?: string;
};

export type GetFakeEcommerceProductsSorts = {
  'sort-createdAt'?: string;
};

export type PaginationDTO = {
  skip: number;
  limit: number;
};

export type FakeEcommerceProductPaging = {
  total: number;
  skip: number;
  limit: number;
};

export type GetFakeEcommerceProductsResponse = {
  pagination: FakeEcommerceProductPaging;
  results: FakeEcommerceProduct[];
};

export type GetFakeEcommerceProducts = {
  filters?: GetFakeEcommerceProductsFilters;
  sorts?: GetFakeEcommerceProductsSorts;
  pagination?: PaginationDTO;
};
