import type { InjectionKey } from 'vue';
import type {RuleItem,ValidateError,ValidateFieldsError} from 'async-validator';
export interface FormItemProps {
    label?: string; // 标签
    prop?: string; // FormItem的类型
}
// 实现扩展功能:通过trigger字段判断验证方式。这个字段是第三方库没有的！
export interface FormItemRule extends RuleItem {
    trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>; // {表单项:相应规则}
export interface FormProps {
    // Record类型是内置的定义对象的类型
    model: Record<string , any>;  // model是所有表单项的{ FormItem的类型 : Item的相应内容}
    rules: FormRules 
};

export interface FormContext extends FormProps {
   addField:(field : FormItemContext)=>void;
   removeField:(field : FormItemContext)=>void;
}
// 定义验证的错误类型
export interface FormValidateFailture {
    errors: ValidateError[] | null;
    fields: ValidateFieldsError; // 表单项名称：错误信息数组
}
// 为了传自定义触发验证的方式
export interface FormItemContext{
    validate: (trigger?:string) => Promise<any>;
    // resetField : () => void;
    // clearValidate: () => void;
    prop ?: string;
}
// 表单项的状态
export interface FormItemStatus {
    state : 'success' | 'error' | 'init';
    errorMsg: string;
    loading: boolean;
}
// 定义依赖注入的键
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');

//
export interface FormInstance {
    validate: (trigger?: string) => Promise<any>;
}
export interface FormItemInstance {
    validate: (trigger?: string) => Promise<any>;
    validateStatus: FormItemStatus;
}