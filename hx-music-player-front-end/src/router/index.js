// src/router/index.js
import { createRouter, createWebHistory, } from'vue-router';
import Register from'../views/Register.vue';
import Login from'../views/Login.vue';
import Profile from'../views/Profile.vue';
import findMusic from'../views/findMusic.vue';
import myMusic from'../views/myMusic.vue';
import ListDetailPage from '@/views/listDetailPage.vue';

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/findmusic', component: findMusic },
  { path: '/mymusic', component: myMusic },
  { path: '/listdetailpage', component: ListDetailPage },
  { path:'/', redirect:'/findmusic' }
  // 其他路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
