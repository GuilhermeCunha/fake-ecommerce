import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FirebaseUser } from '../types';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as FirebaseUser;
  },
);
