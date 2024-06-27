export class CreatePagamentoDto {
  assinaturaId: string;
  dataPagamento: Date;
  valorPago: number;
  promocao?: string;
}
