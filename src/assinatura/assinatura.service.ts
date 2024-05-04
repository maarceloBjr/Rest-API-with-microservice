import { Injectable, NotFoundException } from '@nestjs/common';
import { Assinatura } from './assinatura.model';
import { Aplicativo } from '../aplicativo/aplicativo.model';
import { Cliente } from 'src/cliente/cliente.model';

@Injectable()
export class AssinaturaService {
    private assinaturas: Assinatura[] = [];

    insertAssinatura(aplicativo: Aplicativo, cliente: Cliente, dataInicio: Date, dataFim: Date) {
        const id = new Date().getTime().toString();
        const newAssinatura = new Assinatura(id, cliente, aplicativo, dataInicio, dataFim);
        this.assinaturas.push(newAssinatura);
        return id;
    }

    getAssinaturas(){
        return [...this.assinaturas];
    }

    getAssinatura(id: string){
        const assinatura = this.findAssinatura(id)[0];
        return {...assinatura};
    }

    updateAssinatura(id: string, aplicativo: Aplicativo, cliente: Cliente, dataInicio: Date, dataFim: Date){
        const [assinatura, index] = this.findAssinatura(id);
        const updatedAssinatura = {...assinatura};
        if(aplicativo){
            updatedAssinatura.aplicativo = aplicativo;
        }
        if(cliente){
            updatedAssinatura.cliente = cliente;
        }
        if(dataInicio){
            updatedAssinatura.dataInicio = dataInicio;
        }
        if(dataFim){
            updatedAssinatura.dataFim = dataFim;
        }
        this.assinaturas[index] = updatedAssinatura;
    }

    private findAssinatura(id: string): [Assinatura, number]{
        const assinaturaIndex = this.assinaturas.findIndex(assinatura => assinatura.id === id);
        const assinatura = this.assinaturas[assinaturaIndex];
        if(!assinatura){
            throw new NotFoundException('Assinatura não encontrada');
        }
        return [assinatura, assinaturaIndex]
    }

    deleteAssinatura(id: string){
        const index = this.findAssinatura(id)[1];
        this.assinaturas.splice(index, 1);
    }
}
