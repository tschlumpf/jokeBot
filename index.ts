import config from "./config";
import TelegramBot from "node-telegram-bot-api";
import getJoke from "./src/getJoke";
import getFlachwitz from "./src/getFlachwitze";
import logger from "./src/logger";
import checkPermission from "./src/checkPermission";

if (config.telegram.token == null) throw new Error("no token was given.");
const bot = new TelegramBot(config.telegram.token, { polling: true, });

logger.info(`${__filename} started.`);

["exit", "uncaughtException", "SIGINT", "SIGTERM", "SIGKILL"].forEach(signal => {
  process.on(signal, (code, origin) => {
    if (code !== 420) {
      logger.info(`${__filename} finished (${origin ? origin + ": " : ""}${code})`);
    }
    process.exit(420);
  });
});

function main() {
  bot.onText(/\/flachwitz$/, (msg) => {
    logger.info("Flachwitz requested");
    logger.debug(`..from ${msg.from?.first_name?.toString()} ${msg.from?.last_name?.toString()} (${msg.from?.id.toString()})`);

    if (!checkPermission(msg)) {
      logger.info("..Permission denied");
      return;
    }
    logger.info("..Permission granted");

    getFlachwitz()
      .then((joke) => {
        bot.sendMessage(msg.chat.id, joke as string,
          <TelegramBot.SendMessageOptions>config.telegram)
          .then(() => {
            logger.info("Flachwitz was sent.");
          })
          .catch((error) => {
            logger.error(error.stack);
          });
      })
      .catch(error => {
        logger.error(error.stack);
      });
  });

  bot.onText(/\/joke$/, (msg) => {
    logger.info("Joke requested");
    logger.debug(`..from ${msg.from?.first_name?.toString()} ${msg.from?.last_name?.toString()} (${msg.from?.id.toString()})`);

    if (!checkPermission(msg)) {
      logger.info("..Permission denied");
      return;
    }
    logger.info("..Permission granted");

    const randomIdx = Math.floor(Math.random() * config.apis.length);
    getJoke(config.apis[randomIdx])
      .then((joke) => {
        logger.info(`Send joke from '${joke.host}'.`);
        bot.sendMessage(msg.chat.id, joke.joke,
          <TelegramBot.SendMessageOptions>config.telegram)
          .then(() => {
            logger.info("Joke was sent.");
          })
          .catch((error) => {
            logger.error(error.stack);
          });
      })
      .catch(error => {
        logger.error(error.stack);
      });
  });
}
main();
