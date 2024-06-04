import { Inject, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from 'src/application/dtos/pagamento/create-pagamento.dto';
import { UpdatePagamentoDto } from 'src/application/dtos/pagamento/update-pagamento.dto';
import { IPagamentoRepository } from '../repositories/IPagamentoRepository';
import { Pagamento } from '../models/pagamento.model';

@Injectable()
export class PagamentosService {
  constructor(
    @Inject('IPagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
  ) {}
  async create(createPagamentoDto: CreatePagamentoDto) {
    const app = new Pagamento(createPagamentoDto);
    await this.pagamentoRepository.create(app);
    return app;
  }

  async findAll() {
    return this.pagamentoRepository.findAll();
  }

  async findOne(id: string) {
    return this.pagamentoRepository.findById(id);
  }

  update(id: string, updatePagamentoDto: UpdatePagamentoDto) {
    return `This action updates a #${id} pagamento`;
  }

  async remove(id: string) {
    return this.pagamentoRepository.delete(id);
  }
}
