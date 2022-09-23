import { Injectable } from '@nestjs/common';
import { InjectQueue as InjectBullQueue } from "@nestjs/bull";
import { InjectQueue as InjectBullMQQueue } from "@nestjs/bullmq";
import { QUEUE_NAME as BULL_QUEUE_NAME } from "./bull/bull.constants";
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from "./bullmq/bullmq.constants";
import { Queue } from 'bull';

@Injectable()
export class AppService {

  constructor(
    @InjectBullQueue(BULL_QUEUE_NAME) readonly bullQueue: Queue,
    @InjectBullMQQueue(BULLMQ_QUEUE_NAME) readonly bullMQQueue: Queue,
  ) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  addStartToBull() {
    return this.bullQueue.add('start');
  }

  addStartToBullMQ() {
    return this.bullMQQueue.add('start');

  }

  addStopToBull() {
    return this.bullQueue.add('stop');
  }

  addStopToBullMQ() {
    return this.bullMQQueue.add('stop');
  }
}
