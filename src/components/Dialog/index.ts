import Dialog from './MyDialog.vue';
import type { App } from 'vue';

Dialog.install = (app: App) => {
    app.component(Dialog.name!, Dialog);
};

export default Dialog;
export * from './types'; // 导出类型