import { Bot, type Context } from "grammy";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_ID } from "./config.ts";
import { translate } from "./fluent.ts";
import { useFluent, type FluentContextFlavor } from "./plugins/fluent.ts";

type BotContext = Context & FluentContextFlavor;

export const bot = new Bot<BotContext>(TELEGRAM_BOT_TOKEN);

bot.use(useFluent({ translate }));

bot.command("start", (ctx) => ctx.reply(ctx.t("welcome")));

bot.on("message", async (ctx) => {
    await ctx.forwardMessage(TELEGRAM_ADMIN_ID);
    await ctx.reply(ctx.t("message_accepted"));
});
