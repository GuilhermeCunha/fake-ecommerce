import { Module } from '@nestjs/common';
import { SeedsModule } from './mongoose/seeds/seeds.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [AuthModule, SeedsModule],
})
export class SharedTestModule {}
