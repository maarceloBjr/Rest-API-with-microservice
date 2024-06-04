import { PartialType } from '@nestjs/mapped-types';
import { CreateAssinaturaDto } from './create-assinatura.dto';

class _UpdateAssinaturaDto {
    dataInicio: Date;
    dataFim: Date;
  }
  
  export class UpdateAssinaturaDto extends PartialType(_UpdateAssinaturaDto) {}
