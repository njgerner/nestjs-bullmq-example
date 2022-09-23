import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import Bull from 'bull';
import { QUEUE_NAME } from "../bull/bull.constants";

@Processor(QUEUE_NAME)
export class BullProcessor {

  @OnQueueActive()
  async onActive(job: Bull.Job<any>): Promise<any> {
    console.log(
      `Active event on ${QUEUE_NAME} with job: ${JSON.stringify(job)}`
    )
  }

  @OnQueueCompleted()
  async onCompleted(job: Bull.Job<any>): Promise<any> {
    console.log(
      `Completed event on ${QUEUE_NAME} with job: ${JSON.stringify(job)}`
    )
  }

  @OnQueueFailed()
  async onFailed(job: Bull.Job<any>): Promise<any> {
    console.log(
      `Failed event on ${QUEUE_NAME} with job: ${JSON.stringify(job)}`
    )
  }

  @Process('start')
  async start(job: Bull.Job<any>): Promise<any> {
    return Promise.resolve(`START ${QUEUE_NAME}-${job.id}`)
  }

  @Process('stop')
  async stop(job: Bull.Job<any>): Promise<any> {
    return Promise.resolve(`STOP ${QUEUE_NAME}-${job.id}`)
  }
}