import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAplicativoRepository } from 'src/domain/interfaces/IAplicativoRepository';
import { Aplicativo } from './aplicativo.typeorm';

@Injectable()
export class AplicativoRepository implements IAplicativoRepository {
  constructor(
    @InjectRepository(Aplicativo)
    private aplicativoRepository: Repository<Aplicativo>,
  ) {}

  async create(aplicativo: Aplicativo): Promise<void> {
    await this.aplicativoRepository.save(aplicativo);
  }

  async update(aplicativo: Aplicativo): Promise<Aplicativo> {
    await this.aplicativoRepository.update(aplicativo.id, aplicativo);
    return aplicativo;
  }

  async findAll(): Promise<Aplicativo[]> {
    return this.aplicativoRepository.find();
  }

  async findById(id: string): Promise<Aplicativo> {
    return this.aplicativoRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.aplicativoRepository.delete(id);
  }
}
