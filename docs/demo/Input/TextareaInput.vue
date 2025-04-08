<template>
    <Input
      v-model="test"
      placeholder="可以是一个 Textarea"
      type="textarea"
    ></Input>
 </template>
<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/Input/MyInput.vue'
  
const test = ref('');
</script>