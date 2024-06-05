export class Aplicativo {
  id: string;

  nome: string;

  custoMensal: number;

  constructor(props: Partial<Aplicativo>) {
    Object.assign(this, props);
  }
}
