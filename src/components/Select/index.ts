import type { App } from 'vue';
import Select from './MySelect.vue';

Select.install = (app: App) => {app.component(Select.name!, Select);
};

export default Select;

export * from './types';