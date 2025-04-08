<template>
    <div class="lzy-dropdown">
        <Tooltip :trigger="trigger" :placement="placement" :open-delay="openDelay" :close-delay="closeDelay" 
            :manual="manual"
            @visible-change="visibleChange" ref="tooltipRef">
            <slot></slot>
            <template #content>
                <ul class="lzy-dropdown__menu">
                    <template v-for="item in menuOptions" :key="item.key">
                        <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
                        <li class="lzy-dropdown__item"
                            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
                            :id="`dropdown-item-${item.key}`" @click="itemClick(item)">
                            <RenderVnode :vnode="item.label" />
                       
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types';
import Tooltip from '../Tooltip/MyTooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
import { ref,withDefaults } from 'vue';
import RenderVnode from '../Common/RenderVnode';
defineOptions({
    name: 'LzyDropdown',
});
withDefaults(defineProps<DropdownProps>(),{});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance>();

const visibleChange = (e: boolean) => { // 下拉菜单显示/隐藏状态变化时触发
    emits('visible-change', e);
};
const itemClick = (e: MenuOption) => { // 菜单选项点击时触发
    if (e.disabled) return;
    emits('select', e);
};
defineExpose<DropdownInstance>({
    show: () => {
        if (tooltipRef.value) {
            tooltipRef.value.show();
        }
    },
    hide: () => {
        if (tooltipRef.value) {
            tooltipRef.value.hide();
        }
    },
});
</script>