import { Injectable, NotFoundException } from '@nestjs/common';
import { Pagamento } from './pagamento.model';
import { Aplicativo } from '../aplicativo/aplicativo.model';
import { Cliente } from 'src/cliente/cliente.model';
import { Assinatura } from 'src/assinatura/assinatura.model';

@Injectable()
export class PagamentoService {
    private pagamentos: Pagamento[] = [];

    insertPagamento(assinatura: Assinatura, valorPago: number, dataPagamento: Date, promo: string) {
        const id = new Date().getTime().toString();
        const newPagamento = new Pagamento(id, assinatura, valorPago, dataPagamento, promo);
        this.pagamentos.push(newPagamento);
        return id;
    }

    getPagamentos(){
        return [...this.pagamentos];
    }

    getPagamento(id: string){
        const pagamento = this.findPagamento(id)[0];
        return {...pagamento};
    }

    updatePagamento(id: string, assinatura: Assinatura, valorPago: number, dataPagamento: Date, promo: string){
        const [pagamento, index] = this.findPagamento(id);
        const updatedPagamento = {...pagamento};
        if(assinatura){
            updatedPagamento.assinatura = assinatura;
        }
        if(valorPago){
            updatedPagamento.valorPago = valorPago;
        }
        if(dataPagamento){
            updatedPagamento.dataPagamento = dataPagamento;
        }
        if(promo){
            updatedPagamento.promocao = promo;
        }
        this.pagamentos[index] = updatedPagamento;
    }

    private findPagamento(id: string): [Pagamento, number]{
        const pagamentoIndex = this.pagamentos.findIndex(pagamento => pagamento.id === id);
        const pagamento = this.pagamentos[pagamentoIndex];
        if(!pagamento){
            throw new NotFoundException('Pagamento não encontrada');
        }
        return [pagamento, pagamentoIndex]
    }

    deletePagamento(id: string){
        const index = this.findPagamento(id)[1];
        this.pagamentos.splice(index, 1);
    }
}
