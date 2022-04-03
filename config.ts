import 'dotenv/config';
import { AxiosRequestConfig } from "axios";
import { ApiConfig, DenyAllowList } from './src/types';

export default {
  debug: process.env.TG_JOKE_DEBUG?.toLowerCase() === "true" ? true : false,
  apis: <ApiConfig[]>[
    { name: "Your Mother Joke", url: "https://yomomma-api.herokuapp.com/jokes" },
    { name: "Dad Joke", url: "https://icanhazdadjoke.com/" },
    { name: "Chuck Norris Joke", url: "https://api.chucknorris.io/jokes/random", property: "value" },
    { name: "Random Joke", url: "https://v2.jokeapi.dev/joke/Any?type=single" }
  ],
  flachwitze: {
    url: "https://raw.githubusercontent.com/derphilipp/Flachwitze/main/README.md",
    durability: 12 * 60 * 60 * 1000 // 12 hours
  },
  germanJokes: {
    url: "https://raw.githubusercontent.com/tschlumpf/deutsche-Witze/main/witze.json",
    durability: 12 * 60 * 60 * 1000 // 12 hours
  },
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
    list: <DenyAllowList>{
      type: "disabled", // "allow", "deny" or "disabled"
      ids: []
    },
  },
};




