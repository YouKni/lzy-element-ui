import type { App } from 'vue';
import Dropdown from './MyDropdown.vue';

Dropdown.install = (app: App) => {
    app.component(Dropdown.name!, Dropdown);
};

export default Dropdown;

export * from './types';