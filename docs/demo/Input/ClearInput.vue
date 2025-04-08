<template>
  <Input v-model="test" clearable placeholder="输入字符以后可以点击清空" />
  {{test}}
</template>

<script setup>
import { ref } from 'vue';
import Input from '@/components/Input/MyInput.vue';

const test = ref('');
</script>