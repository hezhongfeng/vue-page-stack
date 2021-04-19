import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import('../views/Home.vue');
const Hello = () => import('../views/HelloWorld.vue');
const Index = () => import('../views/index/Index.vue');

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: Hello },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
