<!-- 封装FontAwesome图标，并提供自定义图表组件lzyIcon -->
<template>
    <i class="lzy-icon" :class="{[`lzy-icon--${type}`] : type}" :style="customStyle">
        <FontAwesomeIcon v-bind="$props"></FontAwesomeIcon> <!--将所有传入的属性传递给 FontAwesomeIcon 组件-->
    </i>
</template>
<script setup lang="ts">
import type {IconProps} from './types';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';
defineOptions({
    name:'lzyIcon',
    // inheritAttrs:false, // false防止组件的根元素<i>继承属性
});
const props = defineProps<IconProps>();

// 根据传入的颜色属性，计算自定义样式
const customStyle = computed(() => {
    return props.color ? {color: props.color} : {};
});
</script>