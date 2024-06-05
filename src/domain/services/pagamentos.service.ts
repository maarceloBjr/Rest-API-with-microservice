import { Inject, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from 'src/application/dtos/pagamento/create-pagamento.dto';
import { UpdatePagamentoDto } from 'src/application/dtos/pagamento/update-pagamento.dto';
import { IPagamentoRepository } from '../interfaces/IPagamentoRepository';
import { Pagamento } from '../models/pagamento.model';
import { IAssinaturaRepository } from '../interfaces/IAssinaturaRepository';

@Injectable()
export class PagamentosService {
  constructor(
    @Inject('IPagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,
    @Inject('IAssinaturaRepository')
    private assinaturaRepository: IAssinaturaRepository,
  ) {}
  async create(createPagamentoDto: CreatePagamentoDto) {
    const assinatura = await this.assinaturaRepository.findById(
      createPagamentoDto.assinaturaId,
    );
    const custoApp = assinatura.aplicativo.custoMensal;
    let valorEstorno = createPagamentoDto.valorPago - custoApp;

    //fazer retornar o status baseado no valorEstorno

    const app = new Pagamento(createPagamentoDto);
    app.assinatura = assinatura;
    return await this.pagamentoRepository.create(
      app,
      valorEstorno,
      assinatura.id,
    );
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
