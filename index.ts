import config from "./config";
import TelegramBot from "node-telegram-bot-api";
import getJoke from "./src/getJoke";
import getFlachwitz from "./src/getFlachwitze";
import logger from "./src/logger";
import checkPermissionAndSend from "./src/checkPermissionAndSend";

if (config.telegram.token == null) throw new Error("no token was given.");
const bot = new TelegramBot(config.telegram.token, { polling: true, });

logger.info(`${__filename} started.`);

["exit", "uncaughtException", "SIGINT", "SIGTERM"].forEach(signal => {
  process.on(signal, (code, origin) => {
    if (code !== 420) {
      logger.info(`${__filename} finished (${origin ? origin + ": " : ""}${code})`);
    }
    process.exit(420);
  });
});

function main() {
  bot.onText(/\/flachwitz$/, (msg) => {
    // command /falchwitz
    checkPermissionAndSend(bot, msg, getFlachwitz);
  });

  bot.onText(/\/joke$/, (msg) => {
    // command: /joke
    const randomIdx = Math.floor(Math.random() * config.apis.length);
    checkPermissionAndSend(bot, msg, getJoke, config.apis[randomIdx]);
  });
}
main();
