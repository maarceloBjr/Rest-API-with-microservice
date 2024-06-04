import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.typeorm';
import { Aplicativo } from '../aplicativo/aplicativo.typeorm';

@Entity()
export class Assinatura {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dataInicio: Date;

  @Column()
  dataFim: Date;

  @OneToOne(() => Cliente, (cliente) => cliente.assinatura)
  @JoinColumn()
  cliente: Cliente;

  @OneToOne(() => Aplicativo, (aplicativo) => aplicativo.assinatura)
  @JoinColumn()
  aplicativo: Aplicativo;

  constructor(props: Partial<Assinatura>) {
    Object.assign(this, props);
  }
}
