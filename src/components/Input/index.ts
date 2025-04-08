import type { App } from 'vue';
import Input from './MyInput.vue';

Input.install = (app: App) => {
    app.component(Input.name!, Input);
};

export default Input;

export * from './types';