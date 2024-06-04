import { PartialType } from '@nestjs/mapped-types';

class _UpdateClienteDto {
    nome: string;
    email: string;
  }
  
  export class UpdateClienteDto extends PartialType(_UpdateClienteDto) {}
