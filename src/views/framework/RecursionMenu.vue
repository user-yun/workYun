<template>
  <div>
    <transition v-for="(mli,i) in mList" :key="i+mList.length">
      <el-submenu v-if="mli.children&&mli.children.length>1" :index="mli.path" class="alnlft">
        <template slot="title">
          <i :class="mli.meta.icon"></i>
          <span slot="title" class="emphasize">{{language[mli.name]}}</span>
        </template>
        <recursionMenu :mList="mli.children"></recursionMenu>
      </el-submenu>
      <el-menu-item v-else :index="mli.path" class="alnlft">
        <i :class="mli.meta.icon"></i>
        <span slot="title" class="emphasize">{{language[mli.name]}}</span>
      </el-menu-item>
    </transition>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "recursionMenu",
  data() {
    return {};
  },
  props: {
    mList: {
      type: Array,
      default: []
    }
  }
};
</script>