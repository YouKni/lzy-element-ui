import type {Placement} from '@popperjs/core';
export type trigger = 'hover' | 'click';
export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click' ;
  placement ?: Placement;
  manual?: boolean; // 自动控制：鼠标hover显隐；手动控制：通过v-model或show/hide方法显隐
  transition?: string; // 过渡动画
  openDelay?: number; // 延迟出现
  closeDelay?: number; // 延迟关闭
};

export interface TooltipEmits{
    (e:'visible-change',value:boolean) : void;
    (e:'click-outside',value: boolean) : void;
};

// 手动控制
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}