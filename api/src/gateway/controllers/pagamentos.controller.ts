import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePagamentoDto } from '../../application/dtos/pagamento/create-pagamento.dto';
import { UpdatePagamentoDto } from '../../application/dtos/pagamento/update-pagamento.dto';
import { PagamentosService } from 'src/domain/services/pagamentos.service';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Get()
  findAll() {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentosService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(id);
  }
}
