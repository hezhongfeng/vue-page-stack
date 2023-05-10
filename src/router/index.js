import { createRouter, createWebHashHistory } from 'vue-router';

// import Home from '../views/Home.vue';
// import Step from '../views/Step.vue';
import Index from '../views/index/Index.vue';
import Home from '../views/home/Home.vue';
import MainDetail from '../views/main/MainDetail.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/home/:tab', component: Home },
  {
    path: '/main-detail/:id',
    component: MainDetail
  },
  // { path: '/step', component: Step }
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
});

export default router;
