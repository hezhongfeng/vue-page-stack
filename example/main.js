import App from './App';
import router from './router';
import Vue from 'vue';
import VueStack from '../src/index';
import Cube from 'cube-ui';

Vue.use(VueStack, { router, name: 'vue-stack', keyName: 'stack-key' });
Vue.use(Cube);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
