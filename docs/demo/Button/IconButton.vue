<script setup lang="ts">
import Button from '@/components/Button/MyButton.vue';
import Icon from '@/components/Icon/MyIcon.vue';

</script>
<template>
  <div class="icon">
    <Button type="primary" icon="pen-to-square" />
    <Button type="primary" icon="share-nodes" />
    <Button type="primary" icon="trash-can" />
    <Button type="primary" icon="search">Search</Button>
    <Button type="primary">
      Upload <Icon icon="upload" />
    </Button>
  </div>
</template>