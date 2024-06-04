import { PartialType } from '@nestjs/mapped-types';

class _UpdateAplicativoDto {
  nome: string;
  custoMensal: number;
}

export class UpdateAplicativoDto extends PartialType(_UpdateAplicativoDto) {}
