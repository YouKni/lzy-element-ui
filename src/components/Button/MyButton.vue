<script setup lang="ts">
import type { ButtonProps } from './types';
import {ref} from 'vue';
// defineProps<ButtonProps>() 用于声明组件的 props 类型为 ButtonProps，而 withDefaults 则为这些 props 指定默认值
withDefaults(defineProps<ButtonProps>(),{NativeType:'button'}) ;

defineOptions({  
    // 指定组件的名称，方便在f12开发者工具中调试
    name: 'LzyButton',
});

const _ref = ref<HTMLButtonElement>(); // 用来获取按钮的DOM元素
// 暴露组件实例,让其他组件可以访问这个组件的DOM元素
defineExpose({ 
    _ref,
});
</script>

<template>
  <!-- 添加一个静态类和多个动态css类 , 并通过响应式变量绑定DOM组件-->
  <button
    ref = "_ref"  
    class="lzy-button" :class="{
    [`lzy-button--${type}`]: type, // 如果type存在，则添加对应的类名
    [`lzy-button--${size}`]: size, // 如果size存在，则添加对应的类名
    'is-plain' : plain, // 如果plain为true，则添加is-plain类名
    'is-round'  : round,
    'is-circle' : circle,
    'is-disabled' : disabled,
    'is-loading' : loading,
  }"
  :disabled = "disabled" :autofocus="autofocus" :type="NativeType"> <!-- 需要重新封装原生的属性-->
  <span> 
    <!-- span用来包裹按钮的内容，slot允许父组件向这个按钮组件传递内容-->
    <slot></slot>
  </span>
  </button>
</template>

<style scoped>
.lzy-button {
  background-color:var(--lzy-color-primary);
}
</style>
