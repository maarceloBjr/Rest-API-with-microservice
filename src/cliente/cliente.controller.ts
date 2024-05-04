import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clientesService: ClienteService) {}

  @Post()
  createCliente(
    @Body('nome') nomeCliente: string,
    @Body('email') emailCliente: string,
  ): any {
    const idGerado = this.clientesService.insertCliente(
      nomeCliente,
      emailCliente,
    );
    return { id: idGerado };
  }

  @Get()
  getClientes() {
    return this.clientesService.getClientes();
  }

  @Get(':id')
  getCliente(@Param('id') clienteId: string) {
    return this.clientesService.getCliente(clienteId);
  }

  @Patch(':id')
  updateCliente(
    @Param('id') clienteId: string,
    @Body('nome') nomeCliente: string,
    @Body('email') emailCliente: string,
  ) {
    this.clientesService.updateCliente(clienteId, nomeCliente, emailCliente);
    return null;
  }

  @Delete(':id')
  deleteCliente(@Param('id') clienteId: string,) {
    this.clientesService.deleteCliente(clienteId);
    return null;
  }
}
