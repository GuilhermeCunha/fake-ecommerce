import { Module } from '@nestjs/common';
import { MongooseModule } from './mongoose/mongoose.module';
import { SeedsModule } from './mongoose/seeds/seeds.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [MongooseModule, AuthModule, SeedsModule],
})
export class SharedModule {}
