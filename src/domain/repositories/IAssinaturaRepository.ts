import { SituacaoAssinatura } from 'src/application/util/situacaoAssinatura.enum';
import { Assinatura } from 'src/domain/models/assinatura.model';

export interface IAssinaturaRepository {
  create(assinatura: Assinatura): Promise<void>;
  update(assinatura: Assinatura): Promise<void>;
  findByTipo(tipo: SituacaoAssinatura): Promise<Assinatura[]>;
  findByCliente(clienteId: string): Promise<Assinatura[]>;
  findByAplicativo(aplicativoId: string): Promise<Assinatura[]>;
  findAll(): Promise<Assinatura[]>;
  findById(id: string): Promise<Assinatura>;
  delete(id: string): Promise<void>;
}
