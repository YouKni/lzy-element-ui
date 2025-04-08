// 作为组件的入口文件，将组件插件化后，能被App.use()使用
import Button from './MyButton.vue';
import type { App } from 'vue';

Button.install = (app: App) => {
    if(Button.name){
        app.component(Button.name,Button);
    }      
};

export default Button;
export * from './types'; // 导出类型