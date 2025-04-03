export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'large';
export type NativeType = 'button' | 'submit'| 'reset';
export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    NativeType?: NativeType; // 默认是button
    autofocus?: boolean; // 是否自动获取焦点
    icon?: string;
    loading?: boolean;
    onClick?: (e: MouseEvent) => void;
}
// 实现用户手动获取Button组件实例
export interface ButtonInstance {
    ref: HTMLButtonElement | null;
}