import { Module } from '@nestjs/common';
import { SeedsModule } from './seeds/seeds.module';
import { getMongooseTestModule } from './utils';

@Module({
  imports: [getMongooseTestModule(), SeedsModule],
})
export class MongooseTestModule {}
