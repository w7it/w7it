import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import ssr from 'vike/plugin';

export default defineConfig({
    root: 'src',
    envDir: '../',
    plugins: [react(), mdx(), ssr({ prerender: true })],
    build: { outDir: path.resolve(__dirname, 'dist'), emptyOutDir: true },
    server: { host: true, port: 8000 },
    resolve: { alias: { '~/': `${path.resolve(__dirname, 'src')}/` } },
});
