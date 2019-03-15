import App from './App';
import router from './router';
import Vue from 'vue';
import store from './store';
import VueStack from '../src/index';

Vue.use(VueStack, { router, name: 'vue-stack', keyName: 'router-key' });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
