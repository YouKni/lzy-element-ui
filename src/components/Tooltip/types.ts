import type {Placement} from '@popperjs/core';
export type trigger = 'hover' | 'click';
export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click' ;
  placement ?: Placement;
  manual?: boolean; // 手动控制
  transition?: string; // 过渡动画
  openDelay?: number; // 延迟出现
  closeDelay?: number; // 延迟关闭
};

export interface TooltipEmits{
    (e:'visible-change',value:boolean) : void;
};

// 手动控制
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}