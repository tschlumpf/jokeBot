import 'dotenv/config';
import { AxiosRequestConfig } from "axios";

const config = {
  debug: process.env.TG_JOKE_DEBUG?.toLowerCase() === "true" ? true : false,
  apis: <ApiConfig[]>[
    { name: "Your Mother Joke", url: "https://yomomma-api.herokuapp.com/jokes" },
    { name: "Dad Joke", url: "https://icanhazdadjoke.com/" },
    { name: "Chuck Norris Joke", url: "https://api.chucknorris.io/jokes/random", property: "value" },
    { name: "Random Joke", url: "https://v2.jokeapi.dev/joke/Any?type=single" }
  ],
  flachwitze: "https://raw.githubusercontent.com/derphilipp/Flachwitze/main/README.md",
  axiosConfigs: {
    apis: <AxiosRequestConfig>{
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    },
    flachwitz: <AxiosRequestConfig>{
      "headers": {
        "Accept": "text/plain",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "Cache-Control": "max-age=0"
      }
    }
  },
  telegram: {
    token: process.env.TG_API_TOKEN,
    disable_notification: true,
    parse_mode: "HTML",
    list: <List>{
      type: "disabled", // "allow", "deny" or "disabled"
      ids: []
    },
  },
};

export default config;

type ApiConfig = {
  name: string,
  url: string,
  property?: string // property within the answer which contains the joke
}

type List = {
  type: "allow" | "deny" | "disabled",
  ids: number[]
}