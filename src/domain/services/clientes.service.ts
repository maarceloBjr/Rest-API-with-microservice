import { Inject, Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../../application/dtos/cliente/create-cliente.dto';
import { UpdateClienteDto } from '../../application/dtos/cliente/update-cliente.dto';
import { Cliente } from 'src/domain/models/cliente.model';
import { IClienteRepository } from 'src/domain/repositories/IClienteRepository';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('IClienteRepository')
    private clienteRepository: IClienteRepository,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const app = new Cliente(createClienteDto);
    await this.clienteRepository.create(app);
    return app;
  }

  async findAll() {
    return this.clienteRepository.findAll();
  }

  async findOne(id: string) {
    return this.clienteRepository.findById(id);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findById(id);

    updateClienteDto.nome && (cliente.nome = updateClienteDto.nome);
    updateClienteDto.email && (cliente.email = updateClienteDto.email);

    return this.clienteRepository.update(cliente);
  }

  async remove(id: string) {
    return this.clienteRepository.delete(id);
  }
}
