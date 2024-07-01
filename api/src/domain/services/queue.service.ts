import { Injectable } from '@nestjs/common';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as amqp from 'amqp-connection-manager';

@Injectable()
export class CacheService implements OnModuleInit {
  private connection: amqp.AmqpConnectionManager;
  constructor(@Inject('CACHE_SERVICE') private readonly client: ClientProxy) {}

  async onModuleInit() {
    this.connect();
    try {
      await this.client.connect();
    } catch (err) {
      console.error('Failed to connect to RabbitMQ', err);
    }
  }

  connect() {
    this.connection = amqp.connect(['amqp://rabbitmq:5672'], {
      reconnectTimeInSeconds: 10,
    });

    this.connection.on('connect', () => console.log('Connected to RabbitMQ'));
    this.connection.on('disconnect', (err) =>
      console.log('Disconnected from RabbitMQ', err),
    );
  }

  async sendToCache(data: {
    id: string; value: string;
  }) {
    console.log('Sending to cache', data);
    try{
    return this.client.emit('update_cache', data);
  
    } catch (err) {
      console.error('Failed to send to RabbitMQ', err);
    }
  }
}
