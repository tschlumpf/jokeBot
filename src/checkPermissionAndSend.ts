import config from "../config";
import TelegramBot from "node-telegram-bot-api";
import logger from "./logger";
import { ApiConfig } from "./types";

export default function (bot: TelegramBot, msg: TelegramBot.Message,
  callback: (api?: ApiConfig) => Promise<string>,
  cbArg?: ApiConfig) {

  logger.info(`${msg.text} requested`);
  logger.debug(`..from ${msg.from?.first_name?.toString()} ${msg.from?.last_name?.toString()} (${msg.from?.id.toString()})`);

  if (!checkPermission(msg)) {
    logger.info("..Permission denied");
    return;
  }
  logger.info("..Permission granted");

  callback(cbArg)
    .then((joke) => {
      bot.sendMessage(msg.chat.id, joke,
        <TelegramBot.SendMessageOptions>config.telegram)
        .then(() => {
          logger.info(`${msg.text} was sent`);
        })
        .catch((error) => {
          logger.error(error.stack);
        });
    })
    .catch(error => {
      logger.error(error.stack);
    });
}

function checkPermission(msg: TelegramBot.Message,) {
  if (config.telegram.list.type === "allow") {
    if (config.telegram.list.ids.includes(msg.chat.id)) {
      return true;
    }
    return false;
  }

  if (config.telegram.list.type === "deny") {
    if (!config.telegram.list.ids.includes(msg.chat.id)) {
      return true;
    }
    return false;
  }

  return true;
}