<script setup lang="ts">
import MyButton from './components/Button/MyButton.vue';
import { onMounted, ref } from 'vue';
import type { ButtonInstance } from './components/Button/types';
const buttonRef = ref<ButtonInstance>(); // 获取组件实例

onMounted(() => {
    if (buttonRef.value) {
        console.log(buttonRef.value); 
    }
});
</script>

<template>
  <div id="app">
    <MyButton type="primary" plain ref="buttonRef">Test MyButton</MyButton>
  </div>
</template>

<style scoped>
#app {}
</style>
