import Vue from 'vue'
import Router from 'vue-router'
import menuroule from './menuroule.js';
Vue.use(Router)

let router = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/welcome/Login.vue'),
  },
  {
    path: '/Login',
    redirect: { name: "Login" },
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
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/welcome/HelloWorld.vue'),
    meta: {
      title: "Home",//标题以及父项的唯一标识
      icon: "el-icon-house",//图标
      intercept: true,//是否需要拦截
      role: [1]//角色
    },
  },
]






router = router.concat(menuroule);
export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: router
})
