import DefaultTheme from 'vitepress/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'

import '@vitepress-demo-preview/component/dist/style.css'
import '../../../src/styles/index.css'
import './custom.css'

library.add(fas)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  },
}

/**
 *  为什么 index.ts 能正确解析？
(1) VitePress 自动加载主题文件
VitePress 在启动时会自动查找 .vitepress/theme/index.{js,ts} 并加载它。你不需要手动在 config.ts 里引入它。

(2) Vite 支持 ES 模块和 TypeScript
你的项目可能配置了 "type": "module"（ES 模块），所以 .ts 文件会被当作 ES 模块处理。
Vite 内置了 TypeScript 支持，所以可以直接写 import 和 export 语法。
 */
