import { PartialType } from '@nestjs/mapped-types';

class _UpdateAplicativoDto {
  custoMensal: number;
}

export class UpdateAplicativoDto extends PartialType(_UpdateAplicativoDto) {}
