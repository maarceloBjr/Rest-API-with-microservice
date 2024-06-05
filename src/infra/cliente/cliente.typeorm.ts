import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assinatura } from '../assinatura/assinatura.typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @OneToMany(() => Assinatura, (assinatura) => assinatura.cliente)
  assinatura: Assinatura;

  constructor(props: Partial<Cliente>) {
    Object.assign(this, props);
  }
}
