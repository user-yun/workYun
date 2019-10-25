import Vue from 'vue'
Vue.component("mt", () => import("@/assets/Title.vue"))

import Fragment from "vue-fragment"
Vue.use(Fragment.Plugin)