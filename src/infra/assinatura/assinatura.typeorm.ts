import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.typeorm';
import { Aplicativo } from '../aplicativo/aplicativo.typeorm';
import { Pagamento } from '../pagamento/pagamento.typeorm';

@Entity()
export class Assinatura {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dataInicio: Date;

  @Column()
  dataFim: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.assinatura)
  @JoinColumn()
  cliente: Cliente;

  @ManyToOne(() => Aplicativo, (aplicativo) => aplicativo.assinatura)
  @JoinColumn()
  aplicativo: Aplicativo;

  @OneToMany(() => Pagamento, (pagamento) => pagamento.assinatura)
  pagamento: Pagamento[];

  constructor(props: Partial<Assinatura>) {
    Object.assign(this, props);
  }
}
