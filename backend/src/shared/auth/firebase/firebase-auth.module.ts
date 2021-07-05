import { Module } from '@nestjs/common';
import { FirebaseStrategy } from './firebase.strategy';

@Module({
  providers: [FirebaseStrategy],
  exports: [FirebaseStrategy],
})
export class FirebaseAuthModule {}
