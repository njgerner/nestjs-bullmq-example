import { Processor, WorkerHost } from "@nestjs/bullmq";
import Bull from 'bull';
import { QUEUE_NAME } from "./bullMQ.constants";

@Processor(QUEUE_NAME)
export class BullMQProcessor extends WorkerHost {
  async process(job: Bull.Job<any>, token: string | undefined): Promise<any> {
    switch (token) {
      case 'start':
        return this.start(job);
      case 'stop':
        return this.stop(job);
      default:
        throw new Error(`Process ${token} not implemented`);
    }
  }

  async start(job: Bull.Job<any>): Promise<any> {
    return Promise.resolve(`START ${QUEUE_NAME}-${job.id}`)
  }

  async stop(job: Bull.Job<any>): Promise<any> {
    return Promise.resolve(`STOP ${QUEUE_NAME}-${job.id}`)
  }

}