<template>
  <Input v-model="test" disabled />
</template>

<script setup>
import { ref } from 'vue';
import Input from '@/components/Input/MyInput.vue';

const test = ref('some text');
</script>