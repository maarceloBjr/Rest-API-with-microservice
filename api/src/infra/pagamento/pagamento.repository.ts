import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.typeorm';
import { IPagamentoRepository } from 'src/domain/interfaces/IPagamentoRepository';
import { Assinatura } from '../assinatura/assinatura.typeorm';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Assinatura)
    private assinaturaRepository: Repository<Assinatura>,
  ) {}

  async create(
    pagamento: Pagamento,
    valorEstorno: number,
    assinaturaId: string,
  ): Promise<{ status: string; dataPagamento: Date; valorEstornado?: number }> {
    let status = 'valor_incorreto';
    let pagamentoCreate = null;

    if (valorEstorno >= 0) {
      status = 'pagamento_ok';
      pagamento.valorPago = pagamento.valorPago - valorEstorno;

      // Carregar a assinatura
      const assinatura = await this.assinaturaRepository.findOne({
        where: { id: assinaturaId },
      });

      // Aumentar a dataFim da assinatura em 1 mês
      if (assinatura.dataFim >= new Date()) {
        assinatura.dataFim.setMonth(assinatura.dataFim.getMonth() + 1);
      } else {
        assinatura.dataFim = new Date();
        assinatura.dataFim.setMonth(assinatura.dataFim.getMonth() + 1);
      }

      // Salvar a assinatura atualizada
      await this.assinaturaRepository.save(assinatura);

      pagamentoCreate = await this.pagamentoRepository.save(pagamento);
      return {
        status,
        dataPagamento: pagamentoCreate?.dataPagamento,
        valorEstornado: valorEstorno,
      };
    }

    return {
      status,
      dataPagamento: pagamentoCreate?.dataPagamento,
    };
  }

  async update(pagamento: Pagamento): Promise<void> {
    await this.pagamentoRepository.update(pagamento.id, pagamento);
  }

  async findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository
      .createQueryBuilder('pagamento')
      .leftJoinAndSelect('pagamento.assinatura', 'assinatura')
      .getMany();
  }

  async findById(id: string): Promise<Pagamento> {
    return this.pagamentoRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.pagamentoRepository.delete(id);
  }
}
