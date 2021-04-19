import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import('@/views/home/Home.vue');
const Hello = () => import('@/views/HelloWorld.vue');
const Detail = () => import('@/views/main/MainDetail.vue');
import Index from '@/views/index/Index.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/home', component: Home },
  {
    path: '/main-detail/:id',
    component: Detail,
  },
  { path: '/about', component: Hello },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
