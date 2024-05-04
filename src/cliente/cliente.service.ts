import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './cliente.model';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [
        {
            id: '1',
            nome: 'João',
            email: 'joao@gmail.com'
        },
        {
            id: '2',
            nome: 'Maria',
            email: 'maria@gmail.com'
        },
        {
            id: '3',
            nome: 'Pedro',
            email: 'pedro@gmail.com'
        },
        {
            id: '4',
            nome: 'Ana',
            email: 'ana@gmail.com'
        },
        {
            id: '5',
            nome: 'Marcelo',
            email: 'marcelo@gmail.com'
        },
        {
            id: '6',
            nome: 'Ronaldo',
            email: 'r9@gmail.com'
        },
        {
            id: '7',
            nome: 'Julia',
            email: 'julia@gmail.com'
        },
        {
            id: '8',
            nome: 'Lucas',
            email: 'lucas@gmail.com'
        },
        {
            id: '9',
            nome: 'Carlos',
            email: 'carlos@gmail.com'
        },
        {
            id: '10',
            nome: 'Roberto',
            email: 'roberto@gmail.com'
        }
    ];

    insertCliente(nome: string, email: string) {
        const id = new Date().getTime().toString();
        const newCliente = new Cliente(id, nome, email);
        this.clientes.push(newCliente);
        return id;
    }

    getClientes(){
        return [...this.clientes];
    }

    getCliente(id: string){
        const cliente = this.findCliente(id)[0];
        return {...cliente};
    }

    updateCliente(id: string, nome: string, email: string){
        const [cliente, index] = this.findCliente(id);
        const updatedCliente = {...cliente};
        if(nome){
            updatedCliente.nome = nome;
        }
        if(email){
            updatedCliente.email = email;
        }
        this.clientes[index] = updatedCliente;
    }

    private findCliente(id: string): [Cliente, number]{
        const clienteIndex = this.clientes.findIndex(cliente => cliente.id === id);
        const cliente = this.clientes[clienteIndex];
        if(!cliente){
            throw new NotFoundException('Cliente não encontrado');
        }
        return [cliente, clienteIndex]
    }

    deleteCliente(id: string){
        const index = this.findCliente(id)[1];
        this.clientes.splice(index, 1);
    }
}
