import { Bot, type Context } from "grammy";
import { type FluentContextFlavor, useFluent } from "@grammyjs/fluent";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_ID } from "./config.ts";
import { fluent } from "./fluent.ts";

type BotContext = Context & FluentContextFlavor;

export const bot = new Bot<BotContext>(TELEGRAM_BOT_TOKEN);

// @ts-expect-error problem with AbortSignal
// eslint-disable-next-line react-hooks/rules-of-hooks
bot.use(useFluent({ fluent }));

bot.command("start", (ctx) => ctx.reply(ctx.t("welcome")));

bot.on("message", async (ctx) => {
    await ctx.forwardMessage(TELEGRAM_ADMIN_ID);
    await ctx.reply(ctx.t("message_accepted"));
});
