import { Module } from '@nestjs/common';
import { AssinaturasService } from '../../domain/services/assinaturas.service';
import { AssinaturasController } from 'src/gateway/controllers/assinaturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaRepository } from 'src/infra/assinatura/assinaturas.repository';
import { Assinatura } from 'src/infra/assinatura/assinatura.typeorm';
import { Cliente } from 'src/infra/cliente/cliente.typeorm';
import { ClienteRepository } from 'src/infra/cliente/clientes.repository';
import { AplicativoRepository } from 'src/infra/aplicativo/aplicativos.repository';
import { Aplicativo } from 'src/infra/aplicativo/aplicativo.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Assinatura, Cliente, Aplicativo])],
  controllers: [AssinaturasController],
  providers: [
    AssinaturasService,
    AssinaturaRepository,
    ClienteRepository,
    AplicativoRepository,
    {
      provide: 'IAssinaturaRepository',
      useExisting: AssinaturaRepository,
    },
    {
      provide: 'IClienteRepository',
      useExisting: ClienteRepository,
    },
    {
      provide: 'IAplicativoRepository',
      useExisting: AplicativoRepository,
    },
  ],
})
export class AssinaturasModule {}
