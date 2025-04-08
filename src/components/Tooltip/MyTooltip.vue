<template>
    <div class="lzy-tooltip" v-on="events" ref="popperContainerNode">
        <div class="lzy-tooltip__trigger" ref="triggerNode">
            <slot></slot>
        </div>
        <Transition :name="transition">
            <div class="lzy-tooltip__popper" ref="popperNode" v-if="isOpen">
                <slot name="content">
                    {{ content }}
                </slot>
                <div id="arrow" data-popper-arrow></div> <!-- popper文档 -->
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types';
import { reactive, ref, watch, onUnmounted } from 'vue';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import {debounce} from 'lodash-es';
defineOptions({
    name: 'LzyTooltip'
});
const props = withDefaults(defineProps<TooltipProps>(), { placement: 'bottom', trigger: 'hover', transition: 'fade',
    openDelay:0,closeDelay:0
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>(); // 判断是否点击了tooltip外部
let popperInstance: Instance | null = null;
// 存储事件
let events: Record<string, any> = reactive({});

const open = () => {
    isOpen.value = true;
    emits('visible-change', true);
};
const close = () => {
    isOpen.value = false;
    emits('visible-change', false);
};
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);
const togglePopper = () => {
    if(!isOpen.value){
        openDebounce();
    }else{
        closeDebounce();
    }
};
const attachEvents = () => {
    if (props.trigger === 'hover') {
        events['mouseenter'] = openDebounce;
        events['mouseleave'] = closeDebounce;
    } else if (props.trigger === 'click') {
        events['click'] = togglePopper;
    }
};
useClickOutside(popperContainerNode as any, () => {
    if (props.trigger === 'click' && isOpen.value && !props.manual) { // 自动触发
        closeDebounce();
    }
    if(isOpen.value){
        emits('click-outside',true);
    }
});
// 自动触发 
if (!props.manual) {
    attachEvents();
}

watch(() => props.manual, (isManual) => {
    if (isManual) {
        events = {};
    } else {
        attachEvents();
    }
});


watch(() => props.trigger, (oldEvent, newEvent) => {  // props本身是响应式的
    if (oldEvent !== newEvent) {
        events = {};
        attachEvents();
    }
});

watch(isOpen, (newValue) => {
    if (newValue) {
        if (triggerNode.value && popperNode.value) {
            // 创建实例
            popperInstance = createPopper(triggerNode.value, popperNode.value, {
                placement: props.placement,
            });
        } else {
            // 销毁实例
            popperInstance?.destroy();
        }
    }
}, { flush: 'post' }); // watch默认在组件更新前'pre'执行，这里需要使用'post'，在组件更新后执行

onUnmounted(() => {
    popperInstance?.destroy();
});

defineExpose<TooltipInstance>({
    'show': openDebounce,
    'hide': closeDebounce
});
</script>
