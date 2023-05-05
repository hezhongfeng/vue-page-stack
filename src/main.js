import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import VuePageStack from './lib/index.js';
// import { VuePageStack } from './lib/components/VuePageStack';

const app = createApp(App);

app.use(router);

// app.component('vue-page-stack', VuePageStack());

app.use(VuePageStack, { router });

app.mount('#app');
