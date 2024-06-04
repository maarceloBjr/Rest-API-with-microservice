import { Cliente } from 'src/domain/models/cliente.model';

export interface IClienteRepository {
  create(cliente: Cliente): Promise<void>;
  update(cliente: Cliente): Promise<void>;
  findAll(): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente>;
  delete(id: string): Promise<void>;
}
