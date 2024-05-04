import { Cliente } from "src/cliente/cliente.model";
import { Aplicativo } from "src/aplicativo/aplicativo.model";

export class Assinatura{
    constructor(
        public id: string,
        public cliente: Cliente,
        public aplicativo: Aplicativo,
        public dataInicio: Date,
        public dataFim: Date
    ){}
}