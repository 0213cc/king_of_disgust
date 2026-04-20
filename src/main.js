import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import DataV from '@jiaminghi/data-view'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const dvConfig = {
    container: {
        width: 1920,
        height: 1080
    }
};


const app = createApp(App);

app.use(router);
app.use(store);
app.use(DataV, dvConfig);
app.use(ElementPlus);
app.mount('#app');

