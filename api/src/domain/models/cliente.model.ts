export class Cliente {
  id: string;

  nome: string;

  email: string;

  constructor(props: Partial<Cliente>) {
    Object.assign(this, props);
  }
}
