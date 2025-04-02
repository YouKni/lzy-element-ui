import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

// 自定义icon组件，添加类型和颜色
export interface IconProps extends FontAwesomeIconProps {
    type ?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    color ?: string

}