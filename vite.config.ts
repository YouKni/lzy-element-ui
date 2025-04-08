import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import postcssNested from 'postcss-nested';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
// https://vite.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        treeShaking:true,
    },
    plugins: [vue(), vueDevTools(), vueJsx(),dts()],
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
    // 自定义构建
    build: {
        lib: { 
            entry: resolve(__dirname, 'src/index.ts'), // 指定入口文件
            name: 'LzyElement', // 指定库的全局变量名
            fileName: 'lzy-element', // 包的名称
        },
        rollupOptions: { // 配置打包选项
            external: ['vue','@fortawesome/fontawesome-svg-core','@fortawesome/free-solid-svg-icons',
                '@fortawesome/vue-fontawesome'], // 需要排除的依赖
            output: {
                exports: 'named', // 指定导出格式
                globals: { // 指定全局变量名
                    vue: 'Vue', 
                }
            }
        },

    },
});
