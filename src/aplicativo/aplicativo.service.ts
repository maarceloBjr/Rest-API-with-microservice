import { Injectable, NotFoundException } from '@nestjs/common';
import { Aplicativo } from './aplicativo.model';

@Injectable()
export class AplicativoService {
  private aplicativos: Aplicativo[] = [
    {
      id: '1',
      nome: 'Spotify',
      custoMensal: 16.9,
    },
    {
      id: '2',
      nome: 'Netflix',
      custoMensal: 21.9,
    },
    {
      id: '3',
      nome: 'Amazon Prime',
      custoMensal: 9.9,
    },
    {
      id: '4',
      nome: 'Disney+',
      custoMensal: 7.9,
    },
    {
      id: '5',
      nome: 'HBO Max',
      custoMensal: 14.9,
    },
    {
      id: '6',
      nome: 'Globo Play',
      custoMensal: 22.9,
    },
    {
      id: '7',
      nome: 'Telecine Play',
      custoMensal: 37.9,
    },
    {
      id: '8',
      nome: 'Paramount+',
      custoMensal: 19.9,
    },
    {
      id: '9',
      nome: 'Apple TV+',
      custoMensal: 9.9,
    },
    {
      id: '10',
      nome: 'YouTube Premium',
      custoMensal: 20.9,
    },
  ];

  insertAplicativo(nome: string, custoMensal: number) {
    const id = new Date().getTime().toString();
    const newAplicativo = new Aplicativo(id, nome, custoMensal);
    this.aplicativos.push(newAplicativo);
    return id;
  }

  getAplicativos() {
    return [...this.aplicativos];
  }

  getAplicativo(id: string) {
    const aplicativo = this.findAplicativo(id)[0];
    return { ...aplicativo };
  }

  updateAplicativo(id: string, nome: string, custoMensal: number) {
    const [aplicativo, index] = this.findAplicativo(id);
    const updatedAplicativo = { ...aplicativo };
    if (nome) {
      updatedAplicativo.nome = nome;
    }
    if (custoMensal) {
      updatedAplicativo.custoMensal = custoMensal;
    }
    this.aplicativos[index] = updatedAplicativo;
  }

  private findAplicativo(id: string): [Aplicativo, number] {
    const aplicativoIndex = this.aplicativos.findIndex(
      (aplicativo) => aplicativo.id === id,
    );
    const aplicativo = this.aplicativos[aplicativoIndex];
    if (!aplicativo) {
      throw new NotFoundException('Aplicativo não encontrado');
    }
    return [aplicativo, aplicativoIndex];
  }

  deleteAplicativo(id: string) {
    const index = this.findAplicativo(id)[1];
    this.aplicativos.splice(index, 1);
  }
}
