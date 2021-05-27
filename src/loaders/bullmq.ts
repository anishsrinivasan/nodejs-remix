import express from "express";
import logger from "../core/logger";
import { initSampleWorkers } from "../jobs/sample";
import { Queue } from "bullmq";
import { createBullBoard } from "bull-board";
import { BullMQAdapter } from "bull-board/bullMQAdapter";
import { BULLMQ } from "./../config";

const initBullDashboard = (queues: Queue[] = []): Promise<{ router: any }> => {
  return new Promise((resolve) => {
    const adapterQueues = queues.map((queueMQ) => new BullMQAdapter(queueMQ));
    const { router } = createBullBoard(adapterQueues);
    resolve({ router });
  });
};

export default async ({ app }: { app: express.Application }) => {
  try {
    if (!BULLMQ.SERVICE) {
      logger.warn(`BULL MQ Service - Disabled`);
      return;
    }

    const { queue } = await initSampleWorkers();
    const { router } = await initBullDashboard([queue]);
    app.use("/admin/queue", router);
    logger.info("BullMQ Started");
  } catch (err) {
    logger.error(err);
  }
};
