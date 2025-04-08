export interface SelectOption{
    label:string,
    value:string,
    disabled?:boolean
}
export interface SelectProps{
    modelValue: string,
    options:SelectOption[],
    placeholder:string,
    disabled?:boolean,
    clearable?:boolean,
    renderLabel?:RenderLabelFunc
    filterable?:boolean,
    filterMethod?:CustomFilterFunc
}
export interface SelectState{ // 把输入框的值和选中的select项封装起来
    inputValue:string,
    selectedOption:SelectOption|null,
    mouseHover:boolean,
}
export interface SelectEmits{
    (e:"update:modelValue",value:string):void
    (e:"change",value:string):void
    (e:'visible-change',value:boolean):void
    (e:'clear'):void
}
import type { VNode } from 'vue';
export type RenderLabelFunc = (option : SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];