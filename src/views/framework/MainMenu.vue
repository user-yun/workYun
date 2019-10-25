<template>
  <el-menu
    :default-active="$route.path"
    :collapse="otherInfo.menuCollapse"
    :background-color="otherInfo.themeBackgroundColor"
    :text-color="otherInfo.themeTextColor"
    :active-text-color="activeColor"
    :unique-opened="otherInfo.menuUnique"
    router
    class="h997"
  >
    <RecursionMenu :mList="menuList" :activeColor="activeColor"></RecursionMenu>
  </el-menu>
  <!-- <keep-alive> </keep-alive> <component></component> -->
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainMenu",
  components: {
    RecursionMenu: () => import("@/views/framework/RecursionMenu")
  },
  computed: {
    menuList() {
      let that = this;
      let allMenuList = that.otherInfo.userRoutes;
      let menuList = that.handFor(allMenuList);
      return menuList;
    },
    activeColor() {
      return this.$ColorReverse(this.otherInfo.themeTextColor);
    }
  },
  methods: {
    handFor(l) {
      let that = this;
      let ur = that.userInfo.userRole;
      let lm = [];
      l.forEach(e => {
        if (e.meta.icon && e.meta.role.includes(ur)) {
          if (e.children && e.children.length > 0) {
            that.$set(e, "children", that.handFor(e.children));
          }
          lm.push(e);
        }
      });
      return lm;
    }
  }
};
</script>