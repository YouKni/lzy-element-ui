<script setup lang="ts">
import Dialog from '@/components/Dialog/MyDialog.vue';
import { ref } from 'vue';
const dialogVisble = ref(false)

</script>
<template>
  <div>
    <button @click="dialogVisble = !dialogVisble">点击打开弹窗</button>
    <Dialog v-model:modelValue="dialogVisble" >
      <template #title>标题</template>
      <template #body>
        <div>dialog content</div>
      </template>
    </Dialog>
  </div>
</template>