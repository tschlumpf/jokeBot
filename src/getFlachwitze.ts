import config from "../config";
import axios from "axios";
import logger from "../src/logger";

const FLACHWITZE: string[] = [];
let FLACHWITZE_TIMESTAMP: Date = new Date(1990, 1, 1);

const regexFw = /- (.+)/g;

export default function getFlachwitz(): Promise<string> {
  return new Promise((resolve, reject) => {
    download()
      .then(() => {
        const randomIdx = Math.floor(Math.random() * FLACHWITZE.length);
        resolve(FLACHWITZE[randomIdx]);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function download() {
  return new Promise((resolve, reject) => {
    if (FLACHWITZE.length > 0 &&
      new Date().getTime() - FLACHWITZE_TIMESTAMP.getTime() > config.flachwitze.durability) {

      logger.info("Flachwitze expired.");
    } else if (FLACHWITZE.length > 0) {
      logger.info("Flachwitze are already available.");
      resolve(true);
      return;
    } else {
      logger.info("First run.");
    }

    logger.info("Download Flachwitze.");
    axios.get(config.flachwitze.url, config.axiosConfigs.flachwitz)
      .then(function (response) {
        const matches = response.data.matchAll(regexFw);
        for (const match of matches) {
          FLACHWITZE.push(match[1]);
        }

        if (FLACHWITZE == null || FLACHWITZE.length === 0) {
          reject(new Error("no flachwitze found."));
        }
        FLACHWITZE_TIMESTAMP = new Date();
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}