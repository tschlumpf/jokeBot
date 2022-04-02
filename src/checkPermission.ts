import config from "../config";
import { Message } from "node-telegram-bot-api";

export default function (msg: Message) {
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