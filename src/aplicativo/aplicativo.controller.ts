import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { AplicativoService } from './aplicativo.service';

@Controller('aplicativos')
export class AplicativoController {
  constructor(private readonly aplicativosService: AplicativoService) {}

  @Post()
  createAplicativo(
    @Body('nome') nomeAplicativo: string,
    @Body('custoMensal') custoAplicativo: number,
  ): any {
    const idGerado = this.aplicativosService.insertAplicativo(
      nomeAplicativo,
      custoAplicativo,
    );
    return { id: idGerado };
  }

  @Get()
  getAplicativos() {
    return this.aplicativosService.getAplicativos();
  }

  @Get(':id')
  getAplicativo(@Param('id') aplicativoId: string) {
    return this.aplicativosService.getAplicativo(aplicativoId);
  }

  @Patch(':id')
  updateAplicativo(
    @Param('id') aplicativoId: string,
    @Body('nome') nomeAplicativo: string,
    @Body('custoMensal') custoAplicativo: number,
  ) {
    this.aplicativosService.updateAplicativo(aplicativoId, nomeAplicativo, custoAplicativo);
    return null;
  }

  @Delete(':id')
  deleteAplicativo(@Param('id') aplicativoId: string,) {
    this.aplicativosService.deleteAplicativo(aplicativoId);
    return null;
  }
}
