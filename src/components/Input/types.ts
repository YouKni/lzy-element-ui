export interface InputProps{
    type?: string
    modelValue: string
    size?: 'large' | 'small'
    clearable?: boolean
    showPassword?: boolean
    // 原生属性
    disabled?: boolean
    placeholder?: string
    readonly?: boolean
    autocomplete?: string
    autofocus?: boolean
    form?: string
}

export interface InputEmits{
    (e: 'update:modelValue',value:string):void
    (e: 'change', value: string): void // 输入框内容改变时且失去焦点触发
    (e: 'input', value: string): void // 输入框内容改变触发
    (e: 'focus',value: FocusEvent): void
    (e: 'blur',value:FocusEvent): void  // 失去焦点
    (e: 'clear'): void
}

export interface InputInstance{
    ref: HTMLInputElement | HTMLTextAreaElement;
}