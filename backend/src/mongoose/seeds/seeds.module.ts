import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ProductsModule } from 'src/api/products/products.module';
import { SeedsService } from './seeds.service';

@Module({
  imports: [ProductsModule, CommandModule],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
