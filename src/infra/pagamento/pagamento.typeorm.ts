import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { decimalTransformer } from 'src/util/transformers';
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

  @OneToOne(() => Assinatura, (assinatura) => assinatura.pagamento)
  @JoinColumn()
  assinatura: Assinatura;

  constructor(props: Partial<Pagamento>) {
    Object.assign(this, props);
  }
}
