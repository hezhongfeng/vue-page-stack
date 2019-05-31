import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index/Index';
import MainList from '@/view/main/MainList';
import MainDetail from '@/view/main/MainDetail';
import Login from '@/view/login/Login.vue';
import Signup from '@/view/login/Signup';
import Home from '@/view/home/Home';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/main',
    component: MainList
  },
  {
    path: '/main-detail/:id',
    component: MainDetail
  },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/home/:tab', component: Home }
];

let router = new Router({
  routes
});
// 导航守卫

export default router;
