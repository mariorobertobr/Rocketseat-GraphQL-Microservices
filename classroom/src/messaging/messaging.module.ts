import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purcharses.controller';

@Module({
  controllers: [PurchasesController],
})
export class MessagingModule {}
