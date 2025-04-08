<template>
    <Transition name="fade">
        <div v-if="modelValue" class="lzy-dialog__wrapper" @click.self="handleWrapperClick"> <!-- 遮罩层 -->
            <div class="lzy-dialog" :style="{ width: width }" ref="dialogContainerNode">
                <div class="lzy-dialog__header">
                    <slot name="title">
                        <span>{{ title }}</span>
                    </slot>
                </div>
                <div class="lzy-dialog__body">
                    <slot name="body"></slot>
                </div>
                <div class="lzy-dialog__footer">
                    <Button v-if="showClose" v:type="type" @Click="closeDialog">
                        确认
                    </Button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import type { DialogProps, DialogEmits } from './types';
import { watch, ref } from 'vue';
import Button from '../Button/MyButton.vue';

defineOptions({
    name: 'lzyDialog'
});
const props = withDefaults(defineProps<DialogProps>(), {
    modelValue: false, showClose: true, closeOnClickModal: true, width: '50%'
});
const emits = defineEmits<DialogEmits>();
const dialogContainerNode = ref<HTMLElement>();
const isOpen = ref(false);

const handleWrapperClick = () => {
    // 只有直接点击遮罩层才会触发关闭
    if (props.closeOnClickModal) {
        closeDialog();
    }
};

const openDialog = () => {
    isOpen.value = true;
    emits('update:modelValue', true);
    emits('open');
    document.body.style.overflow = 'hidden'; // 禁用滚动
};
const closeDialog = () => {
    isOpen.value = false;
    emits('update:modelValue', false);
    emits('close');
    document.body.style.overflow = 'auto'; // 启用滚动
};
watch(() => props.modelValue, async (val) => {
    if (val) {
        openDialog();
    } else {
        closeDialog();
    }
});
</script>