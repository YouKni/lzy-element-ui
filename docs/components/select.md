---
title: Select
description: Select 组件的文档
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的 `option` 的 `value` 属性值。

<preview path="../demo/Select/BasicSelect.vue" title="基础选择器" description="Select 基础选择器"></preview>

## 可清空单选

您可以使用清除图标来清除选择。

设置 `clearable` 属性，则可将选择器清空。

<preview path="../demo/Select/ClearSelect.vue" title="可清空单选" description="Select 可清空单选"></preview>

## 自定义模板

你可以自定义如何来渲染每一个选项, 使用 `renderLabel` 属性，它接受一个回调函数，返回 `VNode` 类型。

<preview path="../demo/Select/CustomRender.vue" title="自定义模板" description="Select 自定义模板"></preview>

## 筛选选项

可以利用筛选功能快速查找选项。

添加 `filterable` 属性即可启用搜索功能。 默认情况下，`Select` 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。
<preview path="../demo/Select/FilterSelect.vue" title="筛选选项" description="Select 筛选选项"></preview>