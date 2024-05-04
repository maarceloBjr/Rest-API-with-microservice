import { Assinatura } from "src/assinatura/assinatura.model";

export class Pagamento{
    constructor(
        public id: string,
        public assinatura: Assinatura,
        public valorPago: number,
        public dataPagamento: Date,
        public promocao: string
    ){}
}