import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.typeorm';
import { IPagamentoRepository } from 'src/domain/interfaces/IPagamentoRepository';

@Injectable()
export class PagamentoRepository implements IPagamentoRepository {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
  ) {}

  async create(pagamento: Pagamento): Promise<void> {
    await this.pagamentoRepository.save(pagamento);
  }

  async update(pagamento: Pagamento): Promise<void> {
    await this.pagamentoRepository.update(pagamento.id, pagamento);
  }

  async findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find();
  }

  async findById(id: string): Promise<Pagamento> {
    return this.pagamentoRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.pagamentoRepository.delete(id);
  }
}
