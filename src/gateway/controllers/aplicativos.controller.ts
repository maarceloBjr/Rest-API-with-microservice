import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAplicativoDto } from '../../application/dtos/aplicativo/create-aplicativo.dto';
import { UpdateAplicativoDto } from '../../application/dtos/aplicativo/update-aplicativo.dto';
import { AplicativosService } from 'src/domain/services/aplicativos.service';

@Controller('aplicativos')
export class AplicativosController {
  constructor(private readonly aplicativosService: AplicativosService) {}

  @Post()
  create(@Body() createAplicativoDto: CreateAplicativoDto) {
    return this.aplicativosService.create(createAplicativoDto);
  }

  @Get()
  findAll() {
    return this.aplicativosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aplicativosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAplicativoDto: UpdateAplicativoDto) {
    return this.aplicativosService.update(id, updateAplicativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicativosService.remove(id);
  }
}
