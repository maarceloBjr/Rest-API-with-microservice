import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { PagamentoService } from './pagamento.service';
import { Assinatura } from 'src/assinatura/assinatura.model';
  
  @Controller('pagamentos')
  export class PagamentoController {
    constructor(private readonly pagamentosService: PagamentoService) {}
  
    @Post()
    createPagamento(
      @Body('assinatura') assinatura: Assinatura,
      @Body('valorPago') valorPago: number,
      @Body('dataPagamento') dataPgto: Date,
      @Body('promocao') promo: string,
    ): { id: string } {
      const id = this.pagamentosService.insertPagamento(
        assinatura,
        valorPago,
        dataPgto,
        promo,
      );
      return { id };
    }
  
    @Get()
    getPagamentos() {
      return this.pagamentosService.getPagamentos();
    }
  
    @Get(':id')
    getPagamento(@Param('id') pagamentoId: string) {
      return this.pagamentosService.getPagamento(pagamentoId);
    }
  
    @Patch(':id')
    updatePagamento(
      @Param('id') id: string,
      @Body('assinatura') assinatura: Assinatura,
      @Body('valorPago') valorPago: number,
      @Body('dataPagamento') dataPgto: Date,
      @Body('promocao') promo: string,
    ): void {
      this.pagamentosService.updatePagamento(
        id,
        assinatura,
        valorPago,
        dataPgto,
        promo,
      );
    }
  
    @Delete(':id')
    deletePagamento(@Param('id') pagamentoId: string) {
      this.pagamentosService.deletePagamento(pagamentoId);
      return null;
    }
  }
  