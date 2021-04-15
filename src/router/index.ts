import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import('../views/Home.vue');
const Hello = () => import('../views/HelloWorld.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: Hello },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
