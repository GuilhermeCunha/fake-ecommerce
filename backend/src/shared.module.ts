import { Module } from '@nestjs/common';
import { MongooseModule } from './mongoose/mongoose.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [MongooseModule, AuthModule],
})
export class SharedModule {}
