import { Aplicativo } from './aplicativo.model';
import { Cliente } from './cliente.model';

export class Assinatura {
  id: string;

  dataInicio: Date;

  dataFim: Date;

  cliente: Cliente;

  aplicativo: Aplicativo;

  constructor(props: Partial<Assinatura>) {
    Object.assign(this, props);
  }
}
