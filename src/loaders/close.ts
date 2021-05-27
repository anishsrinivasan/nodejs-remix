import { closeScheduler } from "../jobs/sample";

export default function serverClose() {
  return new Promise((resolve) => {
    try {
      closeScheduler();
      resolve("CLOSED");
    } catch (err) {
      resolve(err);
      console.error("serverClose", err);
    }
  });
}
