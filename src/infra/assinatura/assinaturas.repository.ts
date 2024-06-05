import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAssinaturaRepository } from 'src/domain/repositories/IAssinaturaRepository';
import { Assinatura } from './assinatura.typeorm';
import { SituacaoAssinatura } from 'src/application/util/situacaoAssinatura.enum';

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
    return this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .getMany();
  }

  async findById(id: string): Promise<Assinatura> {
    return this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .where('assinatura.id = :id', { id })
      .getOne();
  }

  async findByTipo(tipo: SituacaoAssinatura): Promise<Assinatura[]> {
    const query = this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo');
  
    if (tipo === SituacaoAssinatura.ATIVA) {
      query.andWhere('assinatura.dataFim > :dataAtual', { dataAtual: new Date() });
    } else if (tipo === SituacaoAssinatura.CANCELADA) {
      query.andWhere('assinatura.dataFim < :dataAtual', { dataAtual: new Date() });
    }
  
    return query.getMany();
  }

  async findByCliente(clienteId: string): Promise<Assinatura[]> {
    return this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .where('assinatura.cliente.id = :clienteId', { clienteId })
      .getMany();
  }

  async findByAplicativo(aplicativoId: string): Promise<Assinatura[]> {
    return this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .where('assinatura.aplicativo.id = :aplicativoId', { aplicativoId })
      .getMany();
  }

  async delete(id: string): Promise<void> {
    await this.assinaturaRepository.delete(id);
  }
}
