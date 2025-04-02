/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import postcssNested from 'postcss-nested';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vite.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        treeShaking:true,
    },
    plugins: [vue(), vueDevTools(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssNested(), // 或 postcssNesting()
            ],
        }
    },
    
});
