<template>
  <fragment>
    <template v-for="(mli,i) in mList">
      <el-submenu
        v-if="mli.children&&mli.children.length>1"
        :index="mli.path"
        class="alnlft"
        :key="i+mList.length"
      >
        <template slot="title">
          <i
            :class="mli.meta.icon"
            :style="{color:mli.path == $route.path ?activeColor:otherInfo.themeTextColor}"
          ></i>
          <span slot="title" class="emphasize">{{language[mli.name]}}</span>
        </template>
        <recursionMenu style="margin-left:0.5vw" :mList="mli.children"></recursionMenu>
      </el-submenu>
      <el-menu-item v-else :index="mli.path" class="alnlft" :key="i+mList.length">
        <i
          :class="mli.meta.icon"
          :style="{color:mli.path == $route.path ?activeColor:otherInfo.themeTextColor}"
        ></i>
        <span slot="title" class="emphasize">{{language[mli.name]}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "recursionMenu",
  props: {
    activeColor: {
      type: String,
      default: ""
    },
    mList: {
      type: Array,
      default: []
    }
  }
};
</script>