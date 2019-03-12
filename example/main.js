import App from './App';
import router from './router';
import Vue from 'vue';
import store from './store';
import HyPage from '../src/index';

Vue.use(HyPage, { router, name: 'hy-page', keyName: 'router-key' });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
