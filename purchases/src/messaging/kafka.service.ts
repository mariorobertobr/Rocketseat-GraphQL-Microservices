import { ClientKafka } from '@nestjs/microservices';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'purchases',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.close();
  }
}
