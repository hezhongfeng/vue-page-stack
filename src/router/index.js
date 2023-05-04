import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';

const routes = [{ path: '/', component: Home }];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
});

export default router;
