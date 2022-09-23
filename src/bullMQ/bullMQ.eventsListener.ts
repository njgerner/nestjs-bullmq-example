import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { QUEUE_NAME } from "./bullMQ.constants";

@QueueEventsListener(QUEUE_NAME)
export class BullMQEventsListener extends QueueEventsHost {

  @OnQueueEvent('active')
  onActive(args: {
    jobId: string;
    prev?: string;
  }, id: string) {
    console.log(
      `Active event on ${QUEUE_NAME} with id: ${id} and args: ${JSON.stringify(args)}`
    )
  }

  @OnQueueEvent('completed')
  onCompleted(args: {
    jobId: string;
    returnvalue: string;
    prev?: string;
  }, id: string) {
    console.log(
      `Completed event on ${QUEUE_NAME} with id: ${id} and args: ${JSON.stringify(args)}`
    );
  }

  @OnQueueEvent('failed')
  onFailed(args: {
    jobId: string;
    failedReason: string;
    prev?: string;
  }, id: string) {
    console.log(
      `Failed event on ${QUEUE_NAME} with id: ${id} and args: ${JSON.stringify(args)}`
    )
  }

}