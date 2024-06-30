import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentosService } from 'src/domain/services/pagamentos.service';
import { CacheService } from 'src/domain/services/queue.service';
import { PagamentosController } from 'src/gateway/controllers/pagamentos.controller';
import { Assinatura } from 'src/infra/assinatura/assinatura.typeorm';
import { AssinaturaRepository } from 'src/infra/assinatura/assinaturas.repository';
import { PagamentoRepository } from 'src/infra/pagamento/pagamento.repository';
import { Pagamento } from 'src/infra/pagamento/pagamento.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento, Assinatura]),
    ClientsModule.register([
      {
        name: 'CACHE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'update_cache',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PagamentosController],
  providers: [
    PagamentosService,
    CacheService,
    PagamentoRepository,
    AssinaturaRepository,
    {
      provide: 'IPagamentoRepository',
      useExisting: PagamentoRepository,
    },
    {
      provide: 'IAssinaturaRepository',
      useExisting: AssinaturaRepository,
    },
  ],
})
export class PagamentosModule {}
