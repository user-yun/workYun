import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWord',
      component: () => import(/* webpackChunkName: "about" */ '@/views/welcome/HelloWorld.vue')
    },
  ]
})
