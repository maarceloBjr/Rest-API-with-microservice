import { Pagamento } from 'src/domain/models/pagamento.model';

export interface IPagamentoRepository {
  create(pagamento: Pagamento): Promise<void>;
  update(pagamento: Pagamento): Promise<void>;
  findAll(): Promise<Pagamento[]>;
  findById(id: string): Promise<Pagamento>;
  delete(id: string): Promise<void>;
}
