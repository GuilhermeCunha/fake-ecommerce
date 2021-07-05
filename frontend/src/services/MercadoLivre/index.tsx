import axios from 'axios';
import {
  MERCADO_LIVRE_ACCESS_TOKEN,
  MERCADO_LIVRE_SITE_ID,
} from 'config/constants';
import {
  GetMercadoLivreProducts,
  MercadoLivreListProductsResponse,
} from './interfaces';

/**
 * https://developers.mercadolivre.com.br/pt_br/itens-e-buscas
 */
const mercadoLivreApi = axios.create({
  baseURL: 'https://api.mercadolibre.com',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

mercadoLivreApi.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${MERCADO_LIVRE_ACCESS_TOKEN}`;
  return request;
});

export const getMercadoLivreProducts = (
  params: GetMercadoLivreProducts,
): Promise<MercadoLivreListProductsResponse> => {
  return mercadoLivreApi
    .get<MercadoLivreListProductsResponse>(
      `/sites/${MERCADO_LIVRE_SITE_ID}/search`,
      {
        params: params,
      },
    )
    .then(({ data }) => {
      return data;
    });
};

export default mercadoLivreApi;
