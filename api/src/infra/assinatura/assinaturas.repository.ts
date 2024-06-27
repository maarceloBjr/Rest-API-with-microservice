import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assinatura } from './assinatura.typeorm';
import { SituacaoAssinatura } from 'src/application/util/situacaoAssinatura.enum';
import { IAssinaturaRepository } from 'src/domain/interfaces/IAssinaturaRepository';

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

  async updateDataFim(id: string, novaDataFim: Date): Promise<void> {
    await this.assinaturaRepository.update(id, { dataFim: novaDataFim });
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
  
    const assinaturas = await query.getMany();
  
    return assinaturas.map(assinatura => ({
      ...assinatura,
      status: assinatura.dataFim > new Date() ? SituacaoAssinatura.ATIVA : SituacaoAssinatura.CANCELADA
    }));
  }

  async findByCliente(clienteId: string): Promise<Assinatura[]> {
    const assinaturas = await this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .where('assinatura.cliente.id = :clienteId', { clienteId })
      .getMany();
  
    return assinaturas.map(assinatura => ({
      ...assinatura,
      status: assinatura.dataFim > new Date() ? SituacaoAssinatura.ATIVA : SituacaoAssinatura.CANCELADA
    }));
  }

  async findByAplicativo(aplicativoId: string): Promise<Assinatura[]> {
    const assinaturas = await this.assinaturaRepository
      .createQueryBuilder('assinatura')
      .leftJoinAndSelect('assinatura.cliente', 'cliente')
      .leftJoinAndSelect('assinatura.aplicativo', 'aplicativo')
      .where('assinatura.aplicativo.id = :aplicativoId', { aplicativoId })
      .getMany();

      return assinaturas.map(assinatura => ({
        ...assinatura,
        status: assinatura.dataFim > new Date() ? SituacaoAssinatura.ATIVA : SituacaoAssinatura.CANCELADA
      }));
  }

  async delete(id: string): Promise<void> {
    await this.assinaturaRepository.delete(id);
  }
}
