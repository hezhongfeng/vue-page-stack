import { createApp } from 'vue';
import router from './router';
import { i18n } from './i18n';

import App from './App.vue';
import VuePageStack from './lib/index.js';

const app = createApp(App);

app.use(router);

app.use(VuePageStack, { router });

app.use(i18n);

app.mount('#app');
