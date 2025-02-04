import { decimalTransformer } from 'src/application/util/transformers';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assinatura } from '../assinatura/assinatura.typeorm';

@Entity()
export class Aplicativo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nome: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    transformer: decimalTransformer,
  })
  custoMensal: number;

  @OneToMany(() => Assinatura, (assinatura) => assinatura.aplicativo)
  assinatura: Assinatura[];
  
  constructor(props: Partial<Aplicativo>) {
    Object.assign(this, props);
  }
}
