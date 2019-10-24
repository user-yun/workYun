<template>
  <el-menu
    :default-active="$route.path"
    :collapse="otherInfo.menuCollapse"
    :background-color="otherInfo.themeBackgroundColor"
    :text-color="otherInfo.themeTextColor"
    :active-text-color="activeColor"
    :unique-opened="otherInfo.menuUnique"
    router
  >
    <transition v-for="(mli,i) in mList" :key="i+mList.length">
      <el-submenu v-if="mli.children&&mli.children.length>1" :index="mli.path" class="alnlft">
        <template slot="title">
          <i :class="mli.meta.icon"></i>
          <span slot="title" class="emphasize">{{language[mli.name]}}</span>
        </template>
        <recursionMenu style="margin-left:0.5vw" :mList="mli.children"></recursionMenu>
      </el-submenu>
      <el-menu-item v-else :index="mli.path" class="alnlft">
        <i :class="mli.meta.icon"></i>
        <span slot="title" class="emphasize">{{language[mli.name]}}</span>
      </el-menu-item>
    </transition>
  </el-menu>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "recursionMenu",
  computed: {
    activeColor() {
      return this.$ColorReverse(this.otherInfo.themeTextColor);
    }
  },
  props: {
    mList: {
      type: Array,
      default: []
    }
  }
};
</script>