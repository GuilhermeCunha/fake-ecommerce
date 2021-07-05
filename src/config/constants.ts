import { ProductSource } from 'interfaces/ProductSource.interface';

export const MERCADO_LIVRE_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MERCADO_LIVRE_ACCESS_TOKEN;
export const NETSHOES_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_NETSHOES_ACCESS_TOKEN;

export const NETSHOES_CLIENT_ID = process.env.NEXT_PUBLIC_NETSHOES_CLIENT_ID;

export const FAKE_STORE_SOURCE: ProductSource = {
  id: 'fakestore',
  name: 'Fake Store',
};
export const MERCADO_LIVRE_SOURCE: ProductSource = {
  id: 'mercadolivre',
  name: 'Mercado Livre',
};

export const NETSHOES_SOURCE: ProductSource = {
  id: 'netshoes',
  name: 'Netshoes',
  comingSoon: true,
};

export const PRODUCT_SOURCES: ProductSource[] = [
  MERCADO_LIVRE_SOURCE,
  FAKE_STORE_SOURCE,
  NETSHOES_SOURCE,
];

export const MERCADO_LIVRE_SITE_ID = 'MLB';

export const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
export const FIREBASE_AUTHDOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN;
export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
