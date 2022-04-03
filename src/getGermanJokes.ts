import config from "../config";
import axios from "axios";
import logger from "../src/logger";

let JOKES: string[] = [];
let JOKES_TIMESTAMP: Date = new Date(1990, 1, 1);

export default function getGermanJokes(): Promise<string> {
  return new Promise((resolve, reject) => {
    download()
      .then(() => {
        const randomIdx = Math.floor(Math.random() * JOKES.length);
        resolve(JOKES[randomIdx]);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function download() {
  return new Promise((resolve, reject) => {
    if (JOKES.length > 0 &&
      new Date().getTime() - JOKES_TIMESTAMP.getTime() > config.germanJokes.durability) {

      logger.info("German jokes expired.");
    } else if (JOKES.length > 0) {
      logger.info("German jokes are already available.");
      resolve(true);
      return;
    } else {
      logger.info("First run.");
    }

    logger.info("Download german jokes.");
    axios.get(config.germanJokes.url, config.axiosConfigs.apis)
      .then(function (response) {
        JOKES = [...response.data.witze];

        if (JOKES == null || JOKES.length === 0) {
          reject(new Error("no german jokes found."));
        }
        logger.info(`${JOKES.length} german jokes found.`);
        JOKES_TIMESTAMP = new Date();
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}