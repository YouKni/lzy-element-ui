<template>
    <Input v-model="test" placeholder="基础文本框，请输入" />
    <span>{{ test }}</span>
  </template>
<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/Input/MyInput.vue';
const test = ref('');
</script>