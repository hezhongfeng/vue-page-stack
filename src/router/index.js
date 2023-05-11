import { createRouter, createWebHashHistory } from 'vue-router';

import Index from '../views/index/Index.vue';
import Home from '../views/home/Home.vue';
import MainDetail from '../views/main/MainDetail.vue';
import Login from '../views/login/Login.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/home/:tab', component: Home },
  {
    path: '/main-detail/:id',
    component: MainDetail
  },
  { path: '/login', component: Login }
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
});

export default router;
