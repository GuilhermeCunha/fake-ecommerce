import axios from 'axios';

import { FakeStoreProduct, GetFakeStoreProducts } from './interfaces';

/**
 * https://fakestoreapi.com/docs
 */
const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

export const getFakeStoreProducts = (
  params: GetFakeStoreProducts,
): Promise<FakeStoreProduct[]> => {
  return fakeStoreApi
    .get<FakeStoreProduct[]>(`/products`, {
      params: params,
    })
    .then(({ data }) => {
      return data;
    });
};

export default fakeStoreApi;
