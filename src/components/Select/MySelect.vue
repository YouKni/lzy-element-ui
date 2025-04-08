<template>
    <div class="lzy-select"
    :class="{'is-disabled':disabled}"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
    >
    <Tooltip placement="bottom-start" manual ref="tooltipRef" @click-outside="controlDropdown(false)">
        <Input v-model="states.inputValue" :disabled="disabled" :placeholder="placeholder" ref="inputRef"
        :readonly="!filterable" @input="generateFilterOptions(states.inputValue)">
      
            <template #suffix>
                <Icon v-if="!showClearIcon" icon="angle-down" class="header-angle" 
                :class="{'is-active':isDropdownShow}"></Icon>
                <Icon v-else icon="circle-xmark" class="header-close" @click.stop="onClear()" ></Icon>
            </template>
        </Input>
        <template #content>
            <ul class="lzy-select__menu">
                <template v-for="(item) in filteredOptions" :key="item.value">
                    <li class="lzy-select__menu-item" 
                    :class="{'is-disabled':item.disabled,'is-selected':states.selectedOption?.value === item.value}" 
                    @click.stop="itemSelect(item)"  
                    :id="`select-item-${item.value}`"> <!-- @click.stop阻止toggleDropdown冒泡-->
                        <RenderVnode :vnode="renderLabel ? renderLabel(item) : item.label" />
                    </li>
                </template>
            </ul>
        </template>
    </Tooltip>
    </div>
</template>

<script setup lang="ts">
import type {SelectProps, SelectEmits,SelectOption,SelectState} from './types';
import { ref,reactive ,computed,watch} from 'vue';
import type {Ref} from 'vue';
import Tooltip from '../Tooltip/MyTooltip.vue';
import type {TooltipInstance} from '../Tooltip/types';
import Input from '../Input/MyInput.vue';
import type {InputInstance} from '../Input/types';
import Icon from '../Icon/MyIcon.vue';
import RenderVnode from '../Common/RenderVnode.ts';
import {isFunction} from 'lodash-es'; // 判断是否是函数

defineOptions({
    name:'LzySelect'
});
const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
});
const emits = defineEmits<SelectEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref<InputInstance>();
const isDropdownShow = ref(false);
const filteredOptions = ref(props.options);

watch(()=>props.options,(newVal)=>{ // 一遇到修改来自外部的响应式数据，就要考虑watch
    filteredOptions.value = newVal;
});
const generateFilterOptions = (search: string) => {
    if(!props.filterable) return;
    if(props.filterMethod && isFunction(props.filterMethod)){
        return props.filterMethod(search);
    }else{
        filteredOptions.value = props.options.filter((item) => {
            return item.label.includes(search);
        });
    }
};

const findOption = (value: string) =>{ // options是从Select父组件传入的
    const option = props.options.find(item => item.value === value);
    return option ? option : null;
};
const initialOption = findOption(props.modelValue); // 允许默认设置input内容为option.label
const states = reactive<SelectState>({
    inputValue:initialOption? initialOption.label : '',
    selectedOption: initialOption,
    mouseHover:false,
});
const controlDropdown = (show: boolean) => {
    if(show){
        tooltipRef.value?.show();
    }else{
        tooltipRef.value?.hide();
    }
    isDropdownShow.value = show;
    emits('visible-change',show);
};
const showClearIcon = computed(()=>{ // 不需要用到旧值，所以不用watch
    if(props.clearable && states.mouseHover && states.inputValue){
        return true;
    }else return false;
});
const onClear = () => {
    states.inputValue = '';
    states.selectedOption = null;
    emits('update:modelValue','');
    emits('change','');
};
const toggleDropdown = () => { // 实现点击Select时展开/收起
    if(props.disabled) return;
    if(isDropdownShow.value){
        controlDropdown(false);
    }else{
        controlDropdown(true);
    }
};
const itemSelect = (e:SelectOption)=>{
    if(e.disabled) return;
    states.inputValue = e.label;
    states.selectedOption = e;
    emits('update:modelValue',e.value);
    emits('change',e.value);
    controlDropdown(false);
    // console.log(inputRef.value.ref);
    if(inputRef.value){
        inputRef.value.ref.focus(); // 获取实例上的方法
    } 
};

</script>