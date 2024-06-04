import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentosService } from 'src/domain/services/pagamentos.service';
import { PagamentosController } from 'src/gateway/controllers/pagamentos.controller';
import { Assinatura } from 'src/infra/assinatura/assinatura.typeorm';
import { PagamentoRepository } from 'src/infra/pagamento/pagamento.repository';
import { Pagamento } from 'src/infra/pagamento/pagamento.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Assinatura])],
  controllers: [PagamentosController],
  providers: [PagamentosService, PagamentoRepository, {
    provide: 'IPagamentoRepository',
    useExisting: PagamentoRepository,
  }],
})
export class PagamentosModule {}
