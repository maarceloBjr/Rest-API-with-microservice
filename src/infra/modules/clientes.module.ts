import { Module } from '@nestjs/common';
import { ClientesService } from '../../domain/services/clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from '../cliente/clientes.repository';
import { ClientesController } from 'src/gateway/controllers/clientes.controller';
import { Cliente } from 'src/infra/cliente/cliente.typeorm';
import { Assinatura } from 'src/infra/assinatura/assinatura.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Assinatura])],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteRepository, {
    provide: 'IClienteRepository',
    useExisting: ClienteRepository,
  }],
})
export class ClientesModule {}
