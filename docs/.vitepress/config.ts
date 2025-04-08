import { defineConfig } from 'vitepress'
import {containerPreview,componentPreview} from '@vitepress-demo-preview/plugin';
import { fileURLToPath } from 'url';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Compononet Project",
  description: "A VitePress Site",
  base:'/lzy-element/',
  // srcDir: 'components' , // 默认源文件在整个.vitepress目录下，这里指定源文件在components目录下
  vite:{
    resolve:{
      alias:{
        '@': fileURLToPath(new URL('../../src',import.meta.url))
      },
    }
  },
  markdown:{
    config(md){
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text:'通用组件',
        items:[
          { text: 'Button', link: '/components/button' },
          { text: 'Tooltip', link: '/components/tooltip' },
        ]
      },
      {
        text:'数据组件',
        items:[
          { text: 'Input', link: '/components/input' },
          { text: 'Collapse', link: '/components/collapse' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Select' , link: '/components/select' },
          { text: 'Form' , link: '/components/form' },
        ]
      },
      {
        text:'反馈组件',
        items:[
          { text: 'Alert', link: '/components/alert' },
          { text: 'Dialog', link: '/components/dialog' },
        ]
      },
      {
        text:'导航组件',
        items:[
          { text: 'Dropdown', link: '/components/dropdown' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
