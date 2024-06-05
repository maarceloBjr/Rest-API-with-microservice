import { Pagamento } from 'src/domain/models/pagamento.model';

export interface IPagamentoRepository {
  create(pagamento: Pagamento, valorEstorno: number, assinaturaId: string): Promise<{status: string, dataPagamento: Date, valorEstornado?: number}>;
  update(pagamento: Pagamento): Promise<void>;
  findAll(): Promise<Pagamento[]>;
  findById(id: string): Promise<Pagamento>;
  delete(id: string): Promise<void>;
}
