import { Module } from '@nestjs/common';
import { MODULES } from './api/modules';
import { SharedModule } from './shared.module';

@Module({
  imports: [SharedModule, ...MODULES],
})
export class AppModule {}
