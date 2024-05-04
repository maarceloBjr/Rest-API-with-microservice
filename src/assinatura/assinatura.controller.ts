import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AssinaturaService } from './assinatura.service';
import { Assinatura } from './assinatura.model';
import { Aplicativo } from 'src/aplicativo/aplicativo.model';
import { Cliente } from 'src/cliente/cliente.model';

@Controller('assinaturas')
export class AssinaturaController {
  constructor(private readonly assinaturasService: AssinaturaService) {}

  @Post()
  createAssinatura(
    @Body('aplicativo') aplicativo: Aplicativo,
    @Body('cliente') cliente: Cliente,
    @Body('dataInicio') dataInicio: Date,
    @Body('dataFim') dataFim: Date,
  ): { id: string } {
    const id = this.assinaturasService.insertAssinatura(
      aplicativo,
      cliente,
      dataInicio,
      dataFim,
    );
    return { id };
  }

  @Get()
  getAssinaturas() {
    return this.assinaturasService.getAssinaturas();
  }

  @Get(':id')
  getAssinatura(@Param('id') assinaturaId: string) {
    return this.assinaturasService.getAssinatura(assinaturaId);
  }

  @Patch(':id')
  updateAssinatura(
    @Param('id') id: string,
    @Body('aplicativo') aplicativo: Aplicativo,
    @Body('cliente') cliente: Cliente,
    @Body('dataInicio') dataInicio: Date,
    @Body('dataFim') dataFim: Date,
  ): void {
    this.assinaturasService.updateAssinatura(
      id,
      aplicativo,
      cliente,
      dataInicio,
      dataFim,
    );
  }

  @Delete(':id')
  deleteAssinatura(@Param('id') assinaturaId: string) {
    this.assinaturasService.deleteAssinatura(assinaturaId);
    return null;
  }
}
