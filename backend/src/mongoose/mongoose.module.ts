import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_CONNECTION_STRING } from 'src/config/constants';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    NestMongooseModule.forRoot(MONGOOSE_CONNECTION_STRING, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    SeedsModule,
  ],
})
export class MongooseModule {}
