import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from "@nestjs/bull";
import { BullModule as BullMQModule } from "@nestjs/bullmq";
import { QUEUE_NAME as BULL_QUEUE_NAME } from "./bull/bull.constants";
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from "./bullMQ/bullMQ.constants";
import { BullProcessor } from "./bull/bull.processor";
import { BullMQProcessor } from "./bullMQ/bullMQ.processor";
import { BullMQEventsListener } from "./bullMQ/bullMQ.eventsListener";

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: BULL_QUEUE_NAME,
        url: 'redis://0.0.0.0:6379'
      }
    ),
    BullMQModule.registerQueue(
      {
        name: BULLMQ_QUEUE_NAME,
        connection: {
          host: '0.0.0.0',
          port: 6379
        }
      }
    )
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BullProcessor,
    BullMQEventsListener,
    BullMQProcessor,
  ],
})
export class AppModule {}
