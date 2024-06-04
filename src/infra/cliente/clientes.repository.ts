import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IClienteRepository } from 'src/domain/repositories/IClienteRepository';
import { Cliente } from './cliente.typeorm';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente): Promise<void> {
    await this.clienteRepository.save(cliente);
  }

  async update(cliente: Cliente): Promise<void> {
    await this.clienteRepository.update(cliente.id, cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findById(id: string): Promise<Cliente> {
    return this.clienteRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
