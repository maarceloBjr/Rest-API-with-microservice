import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AplicativoModule } from './aplicativo/aplicativo.module';
import { ClienteModule } from './cliente/cliente.module';
import { AssinaturaModule } from './assinatura/assinatura.module';

@Module({
  imports: [AplicativoModule, ClienteModule, AssinaturaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
