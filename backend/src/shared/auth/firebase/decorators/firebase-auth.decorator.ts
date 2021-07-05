import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FIREBASE_MODULE_NAME } from 'src/config/constants';

export function FirebaseAuth(): any {
  return applyDecorators(
    UseGuards(AuthGuard(FIREBASE_MODULE_NAME)),
    ApiBearerAuth(),
  );
}
