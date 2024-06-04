import { Assinatura } from 'src/domain/models/assinatura.model';

export interface IAssinaturaRepository {
  create(assinatura: Assinatura): Promise<void>;
  update(assinatura: Assinatura): Promise<void>;
  findAll(): Promise<Assinatura[]>;
  findById(id: string): Promise<Assinatura>;
  delete(id: string): Promise<void>;
}
