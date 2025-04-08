<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import MyButton from './components/Button/MyButton.vue';
import MyCollapse from './components/Collapse/MyCollapse.vue';
import MyCollapseItem from './components/Collapse/MyCollapseItem.vue';
import type { ButtonInstance } from './components/Button/types';
import type { NameType } from './components/Collapse/types';
import MyIcon from './components/Icon/MyIcon.vue';
import MyAlert from './components/Alert/MyAlert.vue';
import MyTooltip from './components/Tooltip/MyTooltip.vue';
import type { TooltipInstance, trigger } from './components/Tooltip/types';
import MyDropdown from './components/Dropdown/MyDropdown.vue';
import Dropdown from './components/Dropdown/Dropdown';
import type { MenuOption } from './components/Dropdown/types';
import MyDialog from './components/Dialog/MyDialog.vue';
const buttonRef = ref<ButtonInstance>(); // 获取Button组件实例
const openedValue = ref<NameType[]>(['1']); // 默认让第一个展开
const tooltipRef = ref<TooltipInstance | null>(); // 获取Tooltip组件实例
const triggerMethod = ref<trigger>('click'); // 默认触发方式
const options: MenuOption[] = [
    { key: 1, label: '选项1', disabled: true },
    { key: 2, label: '选项2', divided: true },
    { key: 3, label: '选项3' },
    { key: 4, label: h('b', 'this is b') }
];
const dialogVisble = ref(false); // 控制dialog显隐
// const open =()=>{
//     tooltipRef.value?.show();
// };
// const close =()=>{
//     tooltipRef.value?.hide();
// };
onMounted(() => {

});
</script>

<template>
  <div id="app">
    <MyDropdown placement="bottom" :trigger="triggerMethod" :menu-options="options">
      <img width="100" height="100">
    </MyDropdown>
    <Dropdown placement="right" :trigger="triggerMethod" :menu-options="options">
      <img width="100" height="100">
    </Dropdown>
    <MyButton type="info" @click="dialogVisble = true">打开dialog</MyButton>
    <MyDialog v-model:modelValue="dialogVisble" >
      <template #title>标题</template>
      <template #body>
        <div>dialog content</div>
      </template>
    </MyDialog>
 
    <MyButton type="primary" size="large" ref="buttonRef" icon="arrow-up">Primary</MyButton>
    <MyButton type="warning" loading>Warning</MyButton>
    <MyButton type="success">success</MyButton>
    <MyButton type="info">info</MyButton>
    <MyButton type="danger" disabled>danger</MyButton>
    <MyButton size="large">Large</MyButton>
    <MyButton round>round</MyButton>
    <MyButton disabled>disabled</MyButton>
    <MyCollapse v-model="openedValue">
      <MyCollapseItem name="1">
        <template #title>
          <h1>标题1</h1>
        </template>
        <h1>headline title</h1>
        <div>this is content 1</div>
      </MyCollapseItem>
      <MyCollapseItem name="2" title="标题2">
        <div>this is content 2</div>
      </MyCollapseItem>
      <MyCollapseItem name="3" title="标题3" disabled>
        <div>this is content 3</div>
      </MyCollapseItem>
    </MyCollapse>
    <a href="#">www.xxx.com</a>
    <MyIcon icon="fa-solid fa-user-secret" color="red"></MyIcon>
    <MyIcon icon="arrow-up" size="2xl" type="primary"></MyIcon>
    <MyAlert type="success" closable>success light</MyAlert>
    <MyAlert type="success" effect="dark">success dark</MyAlert>
    <div style="width: 50px;">
      <MyTooltip placement="right" trigger="click">
        <template #content>
          <span>tooltip-1</span>
        </template>
        <img width="50" height="50">
      </MyTooltip>

      <MyTooltip placement="bottom" :trigger="triggerMethod" ref="tooltipRef" :open-delay="1000" :close-delay="1000">
        <template #content>
          <span>tooltip-2</span>
        </template>
        <img width="50" height="50">
      </MyTooltip>

    </div>

  </div>

</template>

<style scoped></style>
