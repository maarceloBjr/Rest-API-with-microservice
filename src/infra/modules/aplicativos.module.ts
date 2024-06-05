import { Module } from '@nestjs/common';
import { AplicativosService } from '../../domain/services/aplicativos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativosController } from 'src/gateway/controllers/aplicativos.controller';
import { AplicativoRepository } from 'src/infra/aplicativo/aplicativos.repository';
import { Aplicativo } from 'src/infra/aplicativo/aplicativo.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Aplicativo])],
  controllers: [AplicativosController],
  providers: [AplicativosService, AplicativoRepository, {
    provide: 'IAplicativoRepository',
    useExisting: AplicativoRepository,
  }],
})
export class AplicativosModule {}
