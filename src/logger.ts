import winston from "winston";
import config from "../config";

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "joke-bot", },
  transports: [
    new winston.transports.Console({
      format: winston.format.cli(),
    }),
    new winston.transports.File({ filename: 'jokeBot.log' }),
  ],
});

if (config.debug && logger.level !== "debug") {
  logger.level = "debug";
  logger.debug("Debug mode active.");
}

export default logger;