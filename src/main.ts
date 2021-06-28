import { createApp } from 'vue';
import App from './App.vue';
import { store, key } from './store';
import router from './router';
// import VuePageStack from './lib/index';
import { KKeepAlive } from './lib/components/KKeepAlive';

import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App)
  .use(router)
  // .use(VuePageStack, { router })
  .use(store, key)
  .use(Vant)
  .component('k-keep-alive', KKeepAlive)
  .mount('#app');
