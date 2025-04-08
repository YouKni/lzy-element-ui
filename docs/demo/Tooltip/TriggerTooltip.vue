<script setup>
import Button from "@/components/Button/MyButton.vue";
import Tooltip from "@/components/Tooltip/MyTooltip.vue";
</script>
<template>
  <div class="basic block">
    <Tooltip content="hello tooltip" trigger="click">
      <Button>点击激活 tooltip</Button>
    </Tooltip>
  </div>
</template>