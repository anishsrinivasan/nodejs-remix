import logger from "../core/logger";
import { Queue, Worker, Job, QueueScheduler } from "bullmq";
import { BULLMQ } from "./../config";

let worker: Worker<any, void, string>,
  queueScheduler: QueueScheduler | null = null;

const queueName = "sampleTimeout";
export const queueInstance = new Queue(queueName);

// Add to Job Queue
export async function addJobQueue(data: any = {}) {
  try {
    if (!BULLMQ.SERVICE) {
      logger.warn(`BULL MQ Service - Disabled`);
      return;
    }

    await queueInstance.add(queueName, data, {});
  } catch (err) {
    logger.error(err);
  }
}

// Handle Job Activities ()

export async function runJobActivity(job: Job) {
  job.updateProgress(20);
  console.log("Running Job Activity", job.data.id);
  job.updateProgress(100);
}

export function initSampleWorkers(): Promise<{
  message: string;
  queue: Queue;
}> {
  return new Promise((resolve, reject) => {
    try {
      if (!BULLMQ.SERVICE) {
        logger.warn(`BULL MQ Service - Disabled`);
        return;
      }

      if (!worker) {
        worker = new Worker(queueName, runJobActivity);
      }

      if (!queueScheduler) {
        queueScheduler = new QueueScheduler(queueName);
      }

      resolve({
        message: "Init Workers Successful",
        queue: queueInstance,
      });
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
}

export async function removeExistingJobs(roomId: number) {
  return new Promise(async (resolve) => {
    const jobs = await queueInstance.getJobs(["delayed"]);

    const removeJobsPromises = jobs.map(async (job) => {
      if (job.data.id === roomId) {
        return await queueInstance.remove(String(job.id));
      }

      return false;
    });

    const removeJobs = await Promise.all(removeJobsPromises);
    resolve(removeJobs);
  });
}

export function closeScheduler() {
  if (queueScheduler) {
    console.log("Closing Scheduler");
    queueScheduler.close();
  }
}
