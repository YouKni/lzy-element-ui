// 整个组件库的入口文件
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type {App} from 'vue';
import Icon from './components/Icon/MyIcon.vue';
import Alert from './components/Alert';
import { Collapse, CollapseItem } from './components/Collapse';
import Tooltip from './components/Tooltip';
import Dropdown from './components/Dropdown';
import Input from './components/Input';
import Switch from './components/Switch';
import Select from './components/Select';
import { Form, FormItem } from './components/Form';
import Button from './components/Button';

import './styles/index.css';

library.add(fas); 

// 把所有组件放到一个数组
const components = [
    Button, Collapse, CollapseItem,Icon,Alert,Tooltip,Dropdown,Input,Switch,Select,Form,FormItem
];

// 循环注册组件
const install =  (app : App) => {
    components.forEach(component => {
        app.component(component.name as string, component);      
    });
};

// 允许按需加载
export {
    install,
    Button,
    Collapse,
    CollapseItem,
    Icon,
    Alert,
    Tooltip,
    Dropdown,
    Input,
    Switch,
    Select,
    Form,
    FormItem
};
// 允许全局加载
export default {
    install
};

/**
 * 提升用户开发体验
 * 通过TS的声明合并，把组件注册到Vue的全局组件库中
 * Vue模板使用这些组件时，Ts可以提供自动补全和类型检测
 */
declare module 'vue' {
    export interface GlobalComponents {
      Button: typeof Button;
      Icon: typeof Icon;
      Alert: typeof Alert;
      Collapse: typeof Collapse;
      CollapseItem: typeof CollapseItem;
      Tooltip: typeof Tooltip;
      Dropdown: typeof Dropdown;
      Input: typeof Input;
      Switch: typeof Switch;
      Select: typeof Select;
      Form: typeof Form;
      FormItem: typeof FormItem;
    }
  }