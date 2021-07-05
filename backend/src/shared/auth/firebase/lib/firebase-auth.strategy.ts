import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import { FirebaseUser } from '../types';
import { FIREBASE_MODULE_NAME } from 'src/config/constants';

export interface FirebaseAuthStrategyOptions {
  extractor: JwtFromRequestFunction;
}
const UNAUTHORIZED = 'Usuário nao autenticado';

export class FirebaseAuthStrategy extends Strategy {
  readonly name = FIREBASE_MODULE_NAME;

  constructor(
    options: FirebaseAuthStrategyOptions,
    private extractor: JwtFromRequestFunction,
  ) {
    super();

    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }

    this.extractor = options.extractor;
  }

  async validate(payload: FirebaseUser): Promise<FirebaseUser> {
    return payload;
  }

  authenticate(req: Request): void {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }
  }

  private async validateDecodedIdToken(decodedIdToken: FirebaseUser) {
    const result = await this.validate(decodedIdToken);

    if (result) {
      this.success(result);
    }

    this.fail(UNAUTHORIZED, 401);
  }
}
