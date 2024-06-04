import { Assinatura } from './assinatura.model';

export class Pagamento {
  id: string;

  assinatura: Assinatura;

  valorPago: number;

  dataPagamento: Date;

  promocao?: string;

  constructor(props: Partial<Pagamento>) {
    Object.assign(this, props);
  }
}
