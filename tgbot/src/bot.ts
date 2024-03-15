import { Bot, type Context } from "grammy";
import { TELEGRAM_BOT_TOKEN } from "./config.ts";

type BotContext = Context;

export const bot = new Bot<BotContext>(TELEGRAM_BOT_TOKEN);

bot.on("message", (ctx) => ctx.reply(ctx.message.text ?? "pong"));
