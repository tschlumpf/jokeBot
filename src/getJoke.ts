import config from "../config";
import axios from "axios";

type ResponseJoke = { joke: string; host: string; };

export default function getJoke(api: typeof config.apis[0]): Promise<ResponseJoke> {
  return new Promise((resolve, reject) => {
    axios.get(api.url, config.axiosConfigs.apis)
      .then(function (response) {
        resolve({
          joke: response.data[api.property || "joke"] as string,
          host: response.request.host
        });
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
