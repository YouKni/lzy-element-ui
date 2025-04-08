<template>
    <div class="lzy-form-item" 
    :class="{
            'is-error':validateStatus.state === 'error',
            'is-success':validateStatus.state === 'success',
            'is-loading':validateStatus.loading,
            'is-required':isRequired
        }">
        <label class="lzy-form-item__label">
            <slot name="label" :label="label"> <!-- 不采用传VNode,采用作用域插槽 -->
                {{label}}
            </slot>
        </label>
        <div class="lzy-form-item__content">
            <slot :validate="validate"></slot> <!-- 作用域插槽，把validate方法传给子组件 -->
            <div class="lzy-form-item__error-msg" v-if="validateStatus.state === 'error'">
                {{validateStatus.errorMsg}}
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type {FormItemProps,FormValidateFailture,FormItemContext,FormItemInstance,FormItemStatus} from './types';
import {inject,computed,reactive,provide,onMounted,onUnmounted} from 'vue';
import {formContextKey,formItemContextKey} from './types';
import {isNil} from 'lodash-es'; // isNil判断是否为null或者undefined
import Schema from 'async-validator';
defineOptions({
    name: 'LzyFormItem'
});
const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);
const validateStatus:FormItemStatus= reactive({
    // 验证的状态
    state:'init',
    errorMsg:'',
    loading:false, 
}); 
// let initialValue:string|null = null; // 初始值
const innerValue = computed(()=>{
    const model = formContext?.model; // model是父组件传的所有formItem对象
    if(model && props.prop && !isNil(model[props.prop])){ // props.prop是当前formItem的prop
        return model[props.prop];
    }
    else return null;
});
const itemRules = computed(()=>{
    const rules = formContext?.rules;
    if(rules && props.prop && !isNil(rules[props.prop])){
        return rules[props.prop];
    }
    else return null;
});
const isRequired = computed(()=>{
    const rules = itemRules.value;
    if(rules){
        return rules.some((rule)=>{
            return rule.required;
        });
    }
    return false;
});
const getTriggerRules = (trigger?: string)=>{
    // 根据trigger获取校验规则
    const rules = itemRules.value;
    if(rules){
        return rules.filter((rule)=>{
            if(trigger){
                return rule.trigger === trigger;
            }else return true; // 如果没有设置trigger属性，则默认要验证
        });
    }else{
        return [];
    }
};
const validate = async(trigger ?: string)=>{ 
    const modelName = props.prop;
    const triggeredRules = getTriggerRules(trigger);
    if(triggeredRules.length === 0){
        return true; // 如果没有触发校验规则，则直接返回true
    }
    if(modelName && itemRules.value){
        const validator = new Schema({
            [modelName]:triggeredRules // 表单项的name ： 规则
        });
        validateStatus.loading = true; // 校验中
        return validator.validate({[modelName]:innerValue.value}).then(()=>{
            validateStatus.state = 'success';
        }).catch((err:FormValidateFailture)=>{
            validateStatus.state = 'error';
            const {errors} = err;
            if(errors && errors.length>0){
                validateStatus.errorMsg = errors[0].message as any;
            }else{
                validateStatus.errorMsg = '';
            }
            return Promise.reject(err);
        }).finally(()=>{
            validateStatus.loading = false;
        });
    }  
};
// 清空验证状态
// const clearValidate = ()=>{
//     validateStatus.state = 'init';
//     validateStatus.errorMsg = '';
//     validateStatus.loading = false;
// };
// 清空表单项内容
// const resetField = ()=>{
//     clearValidate();
//     const model = formContext?.model;
//     if(model && props.prop && !isNil(model[props.prop])){ 
//         model[props.prop] = initialValue as string;
//     }

// };
// 该组件的上下文，提供prop类型和校验方法
const context: FormItemContext = {
    validate,
    prop:props.prop, // 虽然没用上
    // clearValidate,
    // resetField,
};
provide(formItemContextKey,context); // 让input组件收到表单组件传来的校验方法

onMounted(()=>{
    if(props.prop){
        formContext?.addField(context);
        // initialValue = innerValue.value; 
    } 
});
onUnmounted(()=>{
    if(props.prop){
        formContext?.removeField(context);
    }
});
defineExpose<FormItemInstance>({
    validateStatus,
    validate,
});
</script>