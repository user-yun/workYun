<template>
  <el-menu :collapse="otherInfo.menuCollapse">
    <transition v-for="(menuListItem,indexList) in menuList" :key="indexList">
      <el-submenu v-if="menuListItem.children" :index="menuListItem.meta.title">
        <template slot="title">
          <i :class="menuListItem.meta.icon"></i>
          <span slot="title">{{menuListItem.meta.title}}</span>
        </template>
        <transition
          v-for="(menuChildrenItem,indexChildren) in menuListItem.children"
          :key="indexChildren"
        >
          <el-menu-item :index="menuChildrenItem.meta.title">
            <i :class="menuChildrenItem.meta.icon"></i>
            <span slot="title">{{menuChildrenItem.meta.title}}</span>
          </el-menu-item>
        </transition>
      </el-submenu>
      <el-menu-item v-else :index="menuListItem.meta.title">
        <i :class="menuListItem.meta.icon"></i>
        <span slot="title">{{menuListItem.meta.title}}</span>
      </el-menu-item>
    </transition>
  </el-menu>
  <!-- <keep-alive> </keep-alive> <component></component> -->
</template>

<script>
import menuroule from "@/menuroule";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "Menu",
  data() {
    return {};
  },
  computed: {
    menuList() {
      let that = this;
      let allMenuList = menuroule;
      let userRole = this.userInfo.userRole;
      let menuList = [];
      allMenuList.forEach((allValue, index) => {
        if (allValue.meta.role.includes(userRole)) {
          if (allValue.children) {
            let childMenuList = [];
            allValue.children.forEach((childValue, index) => {
              if (childValue.meta.role.includes(userRole)) {
                childMenuList.push(childValue);
              }
            });
            that.$set(allValue, "children", childMenuList);
          }
          menuList.push(allValue);
        }
      });
      return menuList;
    }
  }
};
</script>