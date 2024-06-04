import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAssinaturaRepository } from 'src/domain/repositories/IAssinaturaRepository';
import { Assinatura } from './assinatura.typeorm';

@Injectable()
export class AssinaturaRepository implements IAssinaturaRepository {
  constructor(
    @InjectRepository(Assinatura)
    private assinaturaRepository: Repository<Assinatura>,
  ) {}

  async create(assinatura: Assinatura): Promise<void> {
    await this.assinaturaRepository.save(assinatura);
  }

  async update(assinatura: Assinatura): Promise<void> {
    await this.assinaturaRepository.update(assinatura.id, assinatura);
  }

  async findAll(): Promise<Assinatura[]> {
    return this.assinaturaRepository.find();
  }

  async findById(id: string): Promise<Assinatura> {
    return this.assinaturaRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.assinaturaRepository.delete(id);
  }
}
