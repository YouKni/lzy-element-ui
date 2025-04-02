import './styles/index.css'; // 引入全局样式
import { createApp } from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core'; // 引入图标库
import { fas } from '@fortawesome/free-solid-svg-icons'; // 引入所有图标
import App from './App.vue';

const app = createApp(App);
library.add(fas); // 将图标添加到库中
app.mount('#app');
