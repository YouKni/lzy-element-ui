import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'], // 指定要检查的文件类型
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'], // 指定要忽略的文件和目录
  },

  pluginVue.configs['flat/essential'], // 应用vue插件的基本配置
  vueTsConfigs.recommended, // 应用推荐的vue-ts配置

  {
    ...pluginVitest.configs.recommended, // 应用推荐的vitest配置
    files: ['src/**/__tests__/*'],
  },
  skipFormatting, // 跳过与prettier冲突的配置
  {
    name: 'app/custom-rules',
    rules: {
      // 基础规则
      'no-unused-vars': 'error', // 禁止未使用的变量
      'no-console': 'warn', // 使用console会警告,避免生产环境中遗留调试代码
      'no-debugger': 'error', // 禁止使用debugger,避免生产环境中遗留调试代码
      eqeqeq: 'error', // 强制使用===和!==，避免隐藏类型转换
      camelcase: 'error', // 强制使用驼峰命名法

      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any类型
      '@typescript-eslint/consistent-type-imports': 'error', // 强制使用一致的类型导入

      // Vue 规则
      'vue/component-name-in-template-casing': ['error', 'PascalCase'], // 组件名在模板中使用PascalCase命名
      'vue/no-unused-components': 'error', // 禁止未使用的组件

      // 格式化规则
      indent: ['error', 4], // 强制使用4个空格进行缩进
      quotes: ['error', 'single'], // 强制使用单引号
      semi: ['warn', 'always'], // 强制在语句末尾使用分号
      'max-len': ['error', { code: 120, ignoreUrls: true }], // 强制每行代码长度不超过120个字符(忽略url)
    },
  },
)
