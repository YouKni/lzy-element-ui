<template>
    <div class="lzy-input" :class="{
        [`lzy-input--${type}`]: type,
        [`lzy-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend, // $slots 是一个对象，包含了所有插槽
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
    }">
        <!-- Input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="lzy-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="lzy-input__wrapper">
                <!-- prefix -->
                <span class="lzy-input__prefix" v-if="$slots.prefix">
                    <slot name="prefix"></slot>
                </span>
                <!-- Input输入框 -->
                <input v-model="innerValue" class="lzy-input__inner" ref="inputRef"
                    :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" @input="handleInput"
                    @focus="handleFocus" @blur="handleBlur" @change="handleChange" :disabled="disabled"
                    :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                    :form="form" />
                <!-- suffix -->
                <span class="lzy-input__suffix" v-if="$slots.suffix || showClear || showPasswordArea"
                    @click="keepFocus">
                    <slot name="suffix"></slot>
                    <Icon icon="circle-xmark" v-if="showClear" class="lzy-input__clear" 
                    @mousedown="clear"></Icon>
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="lzy-input__password"
                        @click="passwordVisible = !passwordVisible"></Icon>
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="lzy-input__password"
                        @click="passwordVisible = !passwordVisible"></Icon>
                </span>
            </div>
            <!-- append slot -->
            <div class="lzy-input__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea v-model="innerValue" ref="inputRef" @input="handleInput" @change="handleChange"
                class="lzy-textarea__wrapper" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete"
                :placeholder="placeholder" :autofocus="autofocus" :form="form"></textarea>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, nextTick,inject, type Ref } from 'vue';
import type { InputProps, InputEmits } from './types';
import Icon from '../Icon/MyIcon.vue';
import { formItemContextKey } from '../Form/types';
defineOptions({
    name: 'LzyInput',
});
const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    autocomplete: 'off'
});
const innerValue = ref(props.modelValue);
const emits = defineEmits<InputEmits>();
const isFocus = ref(false);
const passwordVisible = ref(false); // 控制密码是否可见
const inputRef = ref() as Ref<HTMLElement>;
/* 表单组件传递的验证方法 */
const formItemContext = inject(formItemContextKey);
const runValidation = (trigger ?: string)=>{
    if(formItemContext){
        formItemContext.validate(trigger);
    }
};
const showClear = computed(() => {
    return props.clearable && innerValue.value !== '' && !props.disabled && isFocus.value;
});
const showPasswordArea = computed(() => { // 是否展示密码图标
    return props.showPassword && innerValue.value !== '' && !props.disabled;
});
const keepFocus = async () => {
    await nextTick();
    inputRef.value?.focus();
};
const handleInput = () => {
    emits('update:modelValue', innerValue.value);
    emits('input', innerValue.value);
    runValidation('input');
};
const handleChange = () => {
    emits('change', innerValue.value);
    runValidation('change');
};
const handleFocus = (event: FocusEvent) => {
    isFocus.value = true;
    emits('focus', event);
};
const handleBlur = (event: FocusEvent) => {
    isFocus.value = false;
    emits('blur', event);
    // 表单的验证
    runValidation('blur');
    
};
const clear = () => {
    innerValue.value = '';
    emits('update:modelValue', '');
    emits('clear');
    emits('input', '');
    emits('change', '');
};
// 注意，innerValue是内部的，当外部父组件改变modelValue，需要用watch来监听让innerValue也更新
watch(() => props.modelValue, (val) => {
    innerValue.value = val;
});
// 暴露DOM结点
defineExpose({
    ref: inputRef,
});


</script>