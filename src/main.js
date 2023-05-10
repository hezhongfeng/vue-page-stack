import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import VuePageStack from './lib/index.js';

const app = createApp(App);

app.use(router);

app.use(VuePageStack, { router });

app.mount('#app');
