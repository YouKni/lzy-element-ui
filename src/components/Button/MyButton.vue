<script setup lang="ts">
import type { ButtonProps } from './types';
import { ref } from 'vue';
import MyIcon from '../Icon/MyIcon.vue';
// defineProps<ButtonProps>() 用于声明组件的 props 类型为 ButtonProps，而 withDefaults 则为这些 props 指定默认值
const props = withDefaults(defineProps<ButtonProps>(), { NativeType: 'button' });

defineOptions({
    // 指定组件的名称，方便在f12开发者工具中调试
    name: 'LzyButton',
});

const _ref = ref<HTMLButtonElement>(); // 用来获取按钮的DOM元素
const handleClick = (e: MouseEvent) => {
    if (props.disabled || props.loading) return;
    props.onClick?.(e); // 调用父组件传递的点击事件
};
defineExpose({
    _ref,
});
</script>

<template>
  <!-- 添加一个静态类和多个动态css类 , 并通过响应式变量绑定DOM组件-->
  <button ref="_ref" class="lzy-button" :class="{
    [`lzy-button--${type}`]: type, // 如果type存在，则添加对应的类名
    [`lzy-button--${size}`]: size, // 如果size存在，则添加对应的类名
    'is-plain': plain, 
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    'is-loading': loading,
  }" :disabled="disabled || loading" :autofocus="autofocus" :type="NativeType"
    @click="handleClick"> 
    <MyIcon icon="spinner" spin v-if="loading"></MyIcon> 
    <MyIcon :icon="icon" v-if="icon && !loading"></MyIcon> 
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style></style>
