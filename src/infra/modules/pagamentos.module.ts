import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentosService } from 'src/domain/services/pagamentos.service';
import { PagamentosController } from 'src/gateway/controllers/pagamentos.controller';
import { Assinatura } from 'src/infra/assinatura/assinatura.typeorm';
import { AssinaturaRepository } from 'src/infra/assinatura/assinaturas.repository';
import { PagamentoRepository } from 'src/infra/pagamento/pagamento.repository';
import { Pagamento } from 'src/infra/pagamento/pagamento.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Assinatura])],
  controllers: [PagamentosController],
  providers: [
    PagamentosService,
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
