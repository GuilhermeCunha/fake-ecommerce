import { Module } from '@nestjs/common';
import { FirebaseAuthModule } from './firebase/firebase-auth.module';

@Module({
  imports: [FirebaseAuthModule],
  exports: [FirebaseAuthModule],
})
export class AuthModule {}
