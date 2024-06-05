import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { decimalTransformer } from 'src/application/util/transformers';
import { Assinatura } from '../assinatura/assinatura.typeorm';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dataPagamento: Date;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    transformer: decimalTransformer,
  })
  valorPago: number;

  @ManyToOne(() => Assinatura, (assinatura) => assinatura.pagamento)
  @JoinColumn()
  assinatura: Assinatura;

  constructor(props: Partial<Pagamento>) {
    Object.assign(this, props);
  }
}
