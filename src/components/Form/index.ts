import type { App } from 'vue';
import Form from './MyForm.vue';
import FormItem from './FormItem.vue';

Form.install = (app: App) => {
    app.component(Form.name!, Form);
};

FormItem.install = (app: App) => {
    app.component(FormItem.name!, FormItem);
};

export { Form, FormItem };

export * from './types';