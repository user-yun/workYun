<template></template>
<script>
import { getLocal } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "Ready",
  data() {
    return {};
  },
  methods: {
    hr(l) {
      let that = this;
      let rl = [];
      l.forEach(le => {
        let children = [];
        if (le.hasOwnProperty("children") && le.children.length > 0) {
          children = that.hr(le.children);
        }
        let ro;
        if (le.component != undefined) {
          ro = {
            path: le.path,
            name: le.name,
            component: () => import(`@/${le.component}`),
            meta: le.meta,
            children
          };
        } else {
          ro = {
            path: le.path,
            name: le.name,
            redirect: le.redirect,
            meta: le.meta,
            children
          };
        }
        rl.push(ro);
      });
      return rl;
    },
    async ready() {
      let that = this;
      let userMemory = getLocal("userMemory");
      let userId = userMemory.userInfo.userId;

      let userRoutes = await this.$Get("/web-config/routes.json");
      // let userRoutes = require("@/routes.json");
      userRoutes = that.hr(userRoutes);

      // let t = setTimeout(() => {
      // let userRoutes = require("@/menuroutes").default();
      that.$router.addRoutes(userRoutes);
      that.setOtherInfo({ userRoutes });
      let redirect = that.$route.params.redirect;
      let pathMatch = that.$route.params.pathMatch;
      let name =
        redirect != undefined
          ? redirect
          : pathMatch.substr(1, pathMatch.length);
      that.$router.replace({ name });
      // clearTimeout(t);
      // }, 2000);
    }
  },
  mounted() {
    this.ready();
  }
};
</script>
