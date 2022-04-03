import config from "../config";
import axios from "axios";

export default function getJoke(api?: typeof config.apis[number]): Promise<string> {
  if (api == null) throw new Error("no API config was given");

  return new Promise((resolve, reject) => {
    axios.get(api.url, config.axiosConfigs.apis)
      .then(function (response) {
        resolve(response.data[api.property || "joke"] as string);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
