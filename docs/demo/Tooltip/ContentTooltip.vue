<script setup>
import Button from "@/components/Button/MyButton.vue";
import Tooltip from "@/components/Tooltip/MyTooltip.vue";
</script>
<template>
  <div class="basic block">
    <Tooltip trigger="click">
      <Button>复杂 HTML 结构的 tooltip</Button>
      <template #content>
        <h3>this is the title</h3>
        <p>this is the content</p>
      </template>
    </Tooltip>
  </div>
</template>