import Vue from 'vue'
import Router from 'vue-router'
import menuroule from './menuroule.js';
Vue.use(Router)

let router = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/welcome/Login.vue'),
  },
  {
    path: '/login',
    redirect: { name: "login" },
  },
  {
    path: '*',
    redirect: { name: "404" },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/welcome/404.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/welcome/Home.vue'),
    meta: {
      icon: "el-icon-house",//图标
      intercept: true,//是否需要拦截
      noKeepAlive: true,
      role: [1]//角色
    },
  },
]






router = router.concat(menuroule());
export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: router
})
