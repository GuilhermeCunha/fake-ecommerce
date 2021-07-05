export type FakeStoreProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
};

export type GetFakeStoreProductsSort = 'desc' | 'asc';
export type GetFakeStoreProducts = {
  limit?: string;
  sort?: GetFakeStoreProductsSort;
};
