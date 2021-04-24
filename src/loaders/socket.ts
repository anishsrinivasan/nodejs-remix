import logger from "../core/logger";

export default async ({ httpServer }: { httpServer: any }) => {
  const io = require("socket.io")(httpServer);
  io.on("connection", function (socket: any) {
    logger.info(`New connection: ${socket.id}`);
    socket.on("disconnect", () =>
      logger.info(`Connection left (${socket.id})`)
    );
  });
  logger.info("Socket Initialized");
};
