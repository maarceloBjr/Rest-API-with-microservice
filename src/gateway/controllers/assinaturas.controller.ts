import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAssinaturaDto } from '../../application/dtos/assinatura/create-assinatura.dto';
import { UpdateAssinaturaDto } from '../../application/dtos/assinatura/update-assinatura.dto';
import { AssinaturasService } from 'src/domain/services/assinaturas.service';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.assinaturasService.update(id, updateAssinaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assinaturasService.remove(id);
  }
}
