import axios from 'axios';
import {
  GetFakeEcommerceProducts,
  GetFakeEcommerceProductsResponse,
} from './interfaces';

/**
 * http://localhost:3333/
 */
const mercadoLivreApi = axios.create({
  baseURL: 'http://localhost:3333/v1',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

export const getFakeEcommerceProducts = (
  params: GetFakeEcommerceProducts = {},
): Promise<GetFakeEcommerceProductsResponse> => {
  return mercadoLivreApi
    .get<GetFakeEcommerceProductsResponse>('/products', {
      params: {
        ...params?.filters,
        ...params?.pagination,
        ...params?.sorts,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export default mercadoLivreApi;
