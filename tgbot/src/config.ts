import { load } from "@std/dotenv";

const env = await load();

const str = (name: string): string => env[name] ?? Deno.env.get(name) ?? "";
// const num = (name: string): number => Number.parseInt(str(name), 10);

export const TELEGRAM_BOT_TOKEN = str("TELEGRAM_BOT_TOKEN");
export const TELEGRAM_ADMIN_ID = 3893433;
