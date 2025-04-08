<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/MySwitch.vue'
const test = ref(false)
</script>
<template>
  <Switch v-model="test" />
</template>