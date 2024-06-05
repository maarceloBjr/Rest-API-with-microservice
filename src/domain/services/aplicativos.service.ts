import { Inject, Injectable } from '@nestjs/common';
import { CreateAplicativoDto } from '../../application/dtos/aplicativo/create-aplicativo.dto';
import { UpdateAplicativoDto } from '../../application/dtos/aplicativo/update-aplicativo.dto';
import { Aplicativo } from 'src/domain/models/aplicativo.model';
import { IAplicativoRepository } from 'src/domain/repositories/IAplicativoRepository';

@Injectable()
export class AplicativosService {
  constructor(
    @Inject('IAplicativoRepository')
    private aplicativoRepository: IAplicativoRepository,
  ) {}

  async create(createAplicativoDto: CreateAplicativoDto) {
    const app = new Aplicativo(createAplicativoDto);
    await this.aplicativoRepository.create(app);
    return app;
  }

  async findAll() {
    return this.aplicativoRepository.findAll();
  }

  async findOne(id: string) {
    return this.aplicativoRepository.findById(id);
  }

  async updateCusto(id: string, updateAplicativoDto: UpdateAplicativoDto) {
    const app = await this.aplicativoRepository.findById(id);

    updateAplicativoDto.custoMensal && (app.custoMensal = updateAplicativoDto.custoMensal);
    if(!updateAplicativoDto.custoMensal){
      throw new Error('Custo mensal não informado');
    }

    return this.aplicativoRepository.update(app);
  }

  async remove(id: string) {
    return this.aplicativoRepository.delete(id);
  }
}
