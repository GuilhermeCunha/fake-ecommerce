import { config } from 'dotenv';
config();

export const CORS_WHITE_LIST = ['localhost:'];

export const APP_PORT = Number(process.env.PORT || process.env.APP_PORT);
export const MONGOOSE_CONNECTION_STRING =
  process.env.MONGOOSE_CONNECTION_STRING;

export const FIREBASE_MODULE_NAME = 'FIREBASE_MODULE_NAME';
