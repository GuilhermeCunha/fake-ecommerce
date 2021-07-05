import * as admin from 'firebase-admin';

export type FirebaseUser = admin.auth.DecodedIdToken & FirebaseCustomClaims;

export const SORT_VALUES = ['1', '-1', 1, -1];

// eslint-disable-next-line @typescript-eslint/ban-types
export type SortOptions<T extends {}> = Partial<
  {
    [Property in keyof T]: typeof SORT_VALUES[number];
  }
>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type PopulateOptions<T extends {}> = Partial<
  {
    [Property in keyof T]: any;
  }
>;
export interface GoogleFirebaseUser extends FirebaseUser {
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export type FirebaseCustomClaims = {
  ADMIN: boolean;
  TEACHER: boolean;
  CLIENT: boolean;
  userId: string;
};
