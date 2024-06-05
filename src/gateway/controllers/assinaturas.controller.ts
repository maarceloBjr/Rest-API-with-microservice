import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAssinaturaDto } from '../../application/dtos/assinatura/create-assinatura.dto';
import { UpdateAssinaturaDto } from '../../application/dtos/assinatura/update-assinatura.dto';
import { AssinaturasService } from 'src/domain/services/assinaturas.service';
import { SituacaoAssinatura } from 'src/application/util/situacaoAssinatura.enum';

@Controller('assinaturas')
export class AssinaturasController {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  @Post()
  create(@Body() createAssinaturaDto: CreateAssinaturaDto) {
    return this.assinaturasService.create(createAssinaturaDto);
  }

  @Get()
  findAll() {
    return this.assinaturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assinaturasService.findOne(id);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: SituacaoAssinatura) {
    return this.assinaturasService.findByTipo(tipo);
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.assinaturasService.findByCliente(clienteId);
  }

  @Get('aplicativo/:aplicativoId')
  findByAplicativo(@Param('aplicativoId') aplicativoId: string) {
    return this.assinaturasService.findByAplicativo(aplicativoId);
  }

  @Get('validaAssinatura/:id')
  validaAssinatura(@Param('id') id: string) {
    return this.assinaturasService.validaAssinatura(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.assinaturasService.update(id, updateAssinaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assinaturasService.remove(id);
  }
}
