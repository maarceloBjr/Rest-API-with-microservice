import { Aplicativo } from 'src/domain/models/aplicativo.model';

export interface IAplicativoRepository {
  create(aplicativo: Aplicativo): Promise<void>;
  update(aplicativo: Aplicativo): Promise<void>;
  findAll(): Promise<Aplicativo[]>;
  findById(id: string): Promise<Aplicativo>;
  delete(id: string): Promise<void>;
}
