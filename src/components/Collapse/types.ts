import type { Ref,InjectionKey } from 'vue';

// 思路：利用响应式ref，将当前展开的项保存到响应式数组中，通过v-model绑定
export type NameType = string | number;

export interface ItemProps {
    name?: NameType, // 唯一标识
    title?: string,
    disabled?: boolean,
}

export interface CollapseProps {
    modelValue?: NameType[], // 当前展开的项，用v-model绑定
    accordion?: boolean, // 是否支持手风琴
}

// 用来描述Povide的类型
export interface CollapseContext{
    activeNames: Ref<NameType[]>,
    handleItemClick: (name: NameType) => void,
}

// symbol + interface ，用于provide/inject的键。
export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey');

// 描述v-model可发出的事件，在祖先组件中通过defineEmits来声明
export interface CollapseModelEmits{
    (e:'update:modelValue', value: NameType[]): void,  // 事件类型为 'update:modelValue' 。用于双向绑定数据更新
    (e:'change', value: NameType[]): void, // 事件类型为 'change' 。 change可用于非双向绑定的数据更新
}