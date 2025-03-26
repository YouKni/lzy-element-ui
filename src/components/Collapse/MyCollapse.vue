<script setup lang="ts">
import type {NameType,CollapseProps,CollapseModelEmits} from './types';
import {CollapseContextKey} from './types';
import {ref,provide,defineProps,defineEmits, watch} from 'vue';
defineOptions({
    name: 'lzy-Collapse'
});

const props = defineProps<CollapseProps>(); // 父组件App.vue传的值
const emits = defineEmits<CollapseModelEmits>(); // 用来声明组件可以触发的事件
const activeNames = ref<NameType[]>(props.modelValue??[]);  // 激活的折叠面板名称数组

// 作用：当父组件传递的modelValue发生变化时，更新activeNames的值
watch(()=>props.modelValue,()=>{
    // 但我已经在v-model中做了处理，不写watch也能工作
    activeNames.value = props.modelValue??[];
});

const handleItemClick = (name: NameType) => {
    if (activeNames.value.includes(name)) {
        activeNames.value = activeNames.value.filter(item => item !== name);
    } else {
        activeNames.value.push(name);
    }
    emits('update:modelValue', activeNames.value);
    emits('change', activeNames.value);
};
// 将activeNames和handleItemClick提供给子组件; 也可以分开提供
provide(CollapseContextKey,{
    activeNames,
    handleItemClick,
});

</script>
<template>
 <div class="lzy-collapse">
    <slot></slot> <!-- 这里的slot允许父组件向lzy-Collapse传递内容-->
 </div>
</template>

<style scoped>

</style>
