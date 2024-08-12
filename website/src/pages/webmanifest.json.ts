import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import logotype from "../assets/logotype.jpg";
import { SITE_TITLE } from "../constants.ts";
import { SITE_NAME } from "../constants.ts";
import { SITE_DESCRIPTION } from "../constants.ts";

const faviconPngSizes = [192, 512];

export const GET: APIRoute = async () => {
    const icons = await Promise.all(
        faviconPngSizes.map(async (size) => {
            const image = await getImage({
                src: logotype,
                width: size,
                height: size,
                format: "png",
            });
            return {
                src: image.src,
                type: `image/${image.options.format}`,
                sizes: `${image.options.width}x${image.options.height}`,
            };
        }),
    );

    const manifest = {
        name: SITE_NAME,
        short_name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        id: "w7it",
        theme_color: "#111111",
        background_color: "#111111",
        icons,
    };

    return new Response(JSON.stringify(manifest));
};
