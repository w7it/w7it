import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
    site: "https://w7it.com",
    base: "/",
    integrations: [icon(), tailwind(), preact(), sitemap()],
});
