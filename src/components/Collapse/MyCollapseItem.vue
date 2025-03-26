<script setup lang="ts">
import type { ItemProps } from './types';
import { CollapseContextKey } from './types';
import { defineProps, inject, computed } from 'vue';
defineOptions({
    name: 'lzy-CollapseItem'
});
const props = defineProps<ItemProps>();
const collapseContext = inject(CollapseContextKey);

// 用来判断当前是否处于激活状态
const isActive = computed(() => {
    if (props.name) {
        return collapseContext?.activeNames?.value.includes(props.name);
    } else {
        return false;
    }

});
const handleClick = () => {
    if (props.disabled) return;
    if (props.name) {
        collapseContext?.handleItemClick(props.name);
    }
};
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    beforeEnter(el) {
        el.style.height = '0px';
        el.style.overflow = 'hidden';
    },
    enter(el) {
        el.style.height = el.scrollHeight + 'px';
    },
    afterEnter(el) {
        el.style.height = 'auto';
        el.style.overflow = '';
    },
    beforeLeave(el) {
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
    },
    leave(el) {
        el.style.height = '0';
    },
    afterLeave(el) {
        el.style.height = '';
        el.style.overflow = '';
    }
};
</script>

<template>
    <div class="lzy-collapse-item">
        <div class="lzy-collapse-item__header" :class="{ 'is-disabled': disabled, 'is-active': isActive }"
            :id="`item-header-${name}`" @click="handleClick">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <Transition name="slide" v-on="transitionEvents"> <!--正常Transition属性名叫v-enter-from,添加name之后变为name-enter-from -->
            <div class="lzy-collapse-item__wrapper" v-show="isActive">
                <div class="lzy-collapse-item__content" :id="`item-content-${name}`">
                    <slot>
                    </slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped></style>
