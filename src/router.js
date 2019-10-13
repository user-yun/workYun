import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = [
  {
    path: '/',
    redirect: { name: "login" },
    meta: {
      intercept: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/welcome/Login.vue'),
    meta: {
      intercept: false
    }
  },
  {
    path: '*',
    redirect: { name: "ready" },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/welcome/404.vue'),
    meta: {
      intercept: false
    }
  },
  {
    path: '/ready',
    name: 'ready',
    component: () => import('@/views/welcome/Ready.vue'),
    meta: {
      intercept: false
    }
  }
]

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: router
})
