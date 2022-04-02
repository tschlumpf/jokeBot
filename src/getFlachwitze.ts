import config from "../config";
import axios from "axios";
import logger from "../src/logger";

const FLACHWITZE: string[] = [];
let FLACHWITZE_TIMESTAMP: Date | undefined;
// const FLACHWITZE_MAX_AGE = 1 * 60 * 60 * 1000; // 1 hour
const FLACHWITZE_MAX_AGE = 1 * 60 * 1000; // 1 min

const regexFw = /- (.+)/g;

export default function getFlachwitz() {
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
    if (FLACHWITZE.length > 0 && FLACHWITZE_TIMESTAMP &&
      new Date().getTime() - FLACHWITZE_TIMESTAMP.getTime() > FLACHWITZE_MAX_AGE) {

      logger.info("Flachwitze expired.");
    } else if (FLACHWITZE.length > 0) {
      logger.info("Flachwitze are already available.");
      resolve(true);
      return;
    } else {
      logger.info("First run.");
    }

    logger.info("Download Flachwitze.");
    axios.get(config.flachwitze, config.axiosConfigs.flachwitz)
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