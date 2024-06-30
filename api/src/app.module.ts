import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AplicativosModule } from './infra/modules/aplicativos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './infra/modules/clientes.module';
import { AssinaturasModule } from './infra/modules/assinaturas.module';
import { Assinatura } from './infra/assinatura/assinatura.typeorm';
import { Aplicativo } from './infra/aplicativo/aplicativo.typeorm';
import { Cliente } from './infra/cliente/cliente.typeorm';
import { PagamentosModule } from './infra/modules/pagamentos.module';
import { Pagamento } from './infra/pagamento/pagamento.typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheService } from './domain/services/queue.service';

@Module({
  imports: [
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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.db/sql',
      entities: [Aplicativo, Cliente, Assinatura, Pagamento],
      synchronize: true,
    }),
    AssinaturasModule,
    AplicativosModule,
    ClientesModule,
    PagamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
