import { Module } from '@nestjs/common';
import { AplicativoController } from './aplicativo.controller';
import { AplicativoService } from './aplicativo.service';

@Module({
  imports: [],
  controllers: [AplicativoController],
  providers: [AplicativoService],
})
export class AplicativoModule {}
