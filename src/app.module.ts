import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AplicativosModule } from './modules/aplicativos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes.module';
import { AssinaturasModule } from './modules/assinaturas.module';
import { Assinatura } from './infra/assinatura/assinatura.typeorm';
import { Aplicativo } from './infra/aplicativo/aplicativo.typeorm';
import { Cliente } from './infra/cliente/cliente.typeorm';
import { PagamentosModule } from './modules/pagamentos.module';
import { Pagamento } from './infra/pagamento/pagamento.typeorm';

@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule {}
