import Vue from 'vue';
import Router from 'vue-router';

import ProductList from '../view/ProductList.vue';
import ProductDetail from '../view/ProductDetail.vue';
import Login from '../view/Login.vue';

Vue.use(Router);

const routes = [
  { path: '/list', component: ProductList },
  { path: '/item/:id', component: ProductDetail },
  { path: '/login', component: Login }
];

let router = new Router({
  routes
});
// 导航守卫

export default router;
