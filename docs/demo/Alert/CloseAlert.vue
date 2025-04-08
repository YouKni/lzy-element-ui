<script setup>
import Alert from '@/components/Alert/MyAlert.vue';
</script>
<template>
  <div class="basic block">
    <Alert type="success" :closable="false">without close</Alert>
  </div>
</template>