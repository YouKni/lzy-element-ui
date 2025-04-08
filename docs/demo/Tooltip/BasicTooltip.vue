<script setup>
import Button from "@/components/Button/MyButton.vue";
import Tooltip from "@/components/Tooltip/MyTooltip.vue";
</script>
<template>
  <div class="basic block">
    <Tooltip content="hello tooltip">
      <Button>激活 Tooltip</Button>
    </Tooltip>
  </div>
</template>