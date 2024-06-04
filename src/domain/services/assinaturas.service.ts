import { Inject, Injectable } from '@nestjs/common';
import { CreateAssinaturaDto } from '../../application/dtos/assinatura/create-assinatura.dto';
import { UpdateAssinaturaDto } from '../../application/dtos/assinatura/update-assinatura.dto';
import { Assinatura } from 'src/domain/models/assinatura.model';
import { IAssinaturaRepository } from 'src/domain/repositories/IAssinaturaRepository';
import { IClienteRepository } from '../repositories/IClienteRepository';
import { IAplicativoRepository } from '../repositories/IAplicativoRepository';

@Injectable()
export class AssinaturasService {
  constructor(
    @Inject('IAssinaturaRepository')
    private assinaturaRepository: IAssinaturaRepository,
    @Inject('IClienteRepository')
    private clienteRepository: IClienteRepository,
    @Inject('IAplicativoRepository')
    private aplicativoRepository: IAplicativoRepository,
  ) {}

  async create(createAssinaturaDto: CreateAssinaturaDto) {
    const cliente = await this.clienteRepository.findById(
      createAssinaturaDto.clienteId,
    );
    const aplicativo = await this.aplicativoRepository.findById(
      createAssinaturaDto.aplicativoId,
    );

    const app = new Assinatura(createAssinaturaDto);
    console.log(app);
    

    app.dataInicio = new Date();
    app.dataFim = new Date();
    app.dataFim.setDate(app.dataFim.getDate() + 7);

    await this.assinaturaRepository.create(app);
    return app;
  }

  async findAll() {
    return this.assinaturaRepository.findAll();
  }

  async findOne(id: string) {
    return this.assinaturaRepository.findById(id);
  }

  async update(id: string, updateAssinaturaDto: UpdateAssinaturaDto) {
    const assinatura = await this.assinaturaRepository.findById(id);

    updateAssinaturaDto.dataInicio &&
      (assinatura.dataInicio = updateAssinaturaDto.dataInicio);
    updateAssinaturaDto.dataFim &&
      (assinatura.dataFim = updateAssinaturaDto.dataFim);

    return this.assinaturaRepository.update(assinatura);
  }

  async remove(id: string) {
    return this.assinaturaRepository.delete(id);
  }
}
