import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import { SITE_NAME } from '#constants';

export default {
    extends: vikeReact,
    lang: 'ru',
    title: SITE_NAME,
    meta: {
        description: { env: { server: true, client: true } },
        previewImageUrl: { env: { server: true, client: true } },
    },
} satisfies Config;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Vike {
        interface Config {
            description?: string;
            previewImageUrl?: string;
        }
    }
}
