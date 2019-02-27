import App from './App';
import router from './router';
import Vue from 'vue';
import store from './store';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
