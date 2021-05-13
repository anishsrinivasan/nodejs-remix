import winston, { format } from "winston";

const getColor = (level: string) => {
  switch (level) {
    case "info":
      return "\x1b[37m";

    case "debug":
      return "\x1b[34m";

    case "error":
      return "\x1b[31m";

    case "warn":
      return "\x1b[33m";

    default:
      return "\x1b[32m";
  }
};

const formatConsolePrint = (log: any) => {
  if (log.level === "info") {
    return `${getColor(log.level)}${log.level.toUpperCase()} - ${log.message}`;
  }

  if (log.level === "error") {
    return `${getColor(log.level)}🔥 ${log.level.toUpperCase()} - ${
      log.message
    }`;
  }

  return `${getColor(log.level)}${log.level.toUpperCase()} - ${log.message}`;
};

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "" },
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
        winston.format.printf(formatConsolePrint)
      ),
    }),
  ],
});

export default logger;
