import { createApp } from 'vue';
import App from './App.vue';
import { store, key } from './store';
import router from './router';

import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(store, key).use(Vant).mount('#app');
