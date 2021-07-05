export type MercadoLivrePaging = {
  total: number;
  offset: number;
  limit: number;
  primary_results: number;
};

export type MercadoLivreProduct = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
};

export type MercadoLivreSort = {
  id: string;
  name: string;
};
export type MercadoLivreType = 'text' | 'boolean' | 'range' | 'STRING';

export type MercadoLivreFilter = {
  id: string;
  name: string;
  type: MercadoLivreType;
  values?: MercadoLivreFilterValue[];
};

export type MercadoLivreFilterValue = {
  id: string;
  name: string;
  results: number;
};
export type MercadoLivreListProductsResponse = {
  site_id: string;
  query: string;
  paging: MercadoLivrePaging;
  results: MercadoLivreProduct[];
  available_filters: MercadoLivreFilter[];
  available_sorts: MercadoLivreSort[];
};

export type GetMercadoLivreProductsPagination = {
  offset?: string;
  limit?: string;
};
export type GetMercadoLivreProducts = {
  q?: string;
  sort?: string;
} & GetMercadoLivreProductsPagination & { [key: string]: string };
