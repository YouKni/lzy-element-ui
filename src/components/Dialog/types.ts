export interface DialogProps{
    modelValue: boolean; // 控制对话框的显隐
    title?: string; 
    width?: string; 
    showClose?: boolean; // 是否显示关闭按钮
    closeOnClickModal?: boolean; // 点击遮罩层是否关闭对话框
}

export interface DialogEmits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
    (e: 'open'): void;
}