<template>
    <form class="lzy-form">
        <slot></slot>
    </form>
</template>

<script setup lang='ts'>
import type {FormProps,FormItemContext,FormContext,FormValidateFailture,FormInstance} from './types';
import type {ValidateFieldsError} from 'async-validator';
import {formContextKey} from './types';
import {provide} from 'vue';
defineOptions({
    name: 'LzyForm'
});
const props = defineProps<FormProps>();
const fields:FormItemContext[] = [];
const addField: FormContext['addField'] = (field:FormItemContext) => {
    fields.push(field);
};
const removeField: FormContext['removeField'] = (field:FormItemContext) => {
    fields.splice(fields.indexOf(field), 1);
};
provide(formContextKey, {...props,addField,removeField});
// 验证所有表单项
const validate = async() => {
    let validationErrors :ValidateFieldsError = {};
    // Promise.allSettled()
    for(const field of fields){
        try{
            await field.validate(''); // 整体验证的时候不需要传trigger
        }catch(e){
            const err = e as FormValidateFailture;
            validationErrors = {...validationErrors,...err.fields};
        }
    }
    if(Object.keys(validationErrors).length===0){
        return true;
    }else{
        return Promise.reject(validationErrors);
    }
};
defineExpose<FormInstance>({
    validate
});
</script>