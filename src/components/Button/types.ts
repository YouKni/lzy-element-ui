export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'large';
export type NativeType = 'button' | 'submit'| 'reset';
export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    NativeType?: NativeType; // 默认是button
    autofocus?: boolean; // 是否自动获取焦点
}

// 创建Button组件实例类型
export interface ButtonInstance {
    ref: HTMLButtonElement | null;
}