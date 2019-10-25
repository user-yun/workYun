<template>
  <div class="alnlft th4 mainTag" style="white-space:nowrap;">
    <el-tag
      v-for="(tag,key) in otherInfo.routerHistory"
      :key="key"
      :closable="closable"
      disable-transitions
      :color=" tag.path == $route.path ? otherInfo.themeBackgroundColor : '#C0C4CC' "
      @click="TagClick(key)"
      @close="TagClose(tag)"
      style="margin-right:0.2vw"
      :style="{cursor: tag.path == $route.path ? `not-allowed` : `pointer`}"
      class="emphasize"
      :size="size"
    >
      <span :style="{ color: tag.path == $route.path ? otherInfo.themeTextColor : '#909399' }">
        <i :class="tag.meta.icon"></i>
        {{language[key]}}
      </span>
    </el-tag>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainTag",
  computed: {
    closable() {
      return Object.keys(this.otherInfo.routerHistory).length > 1;
    },
    size() {
      return this.otherInfo.menuCollapse ? "mini" : "medium";
    }
  },
  methods: {
    TagClose(t) {
      let r = this.otherInfo.routerHistory;
      this.$delete(r, t.name);
      let rk = Object.keys(r);
      let rkl = rk.length;
      if (t.path == this.$route.path) {
        if (rkl > 0) {
          this.$router.replace({ name: rk[rkl - 1] });
        } else {
          this.$router.back();
        }
      }
    },
    TagClick(r) {
      this.$router.replace({ name: r });
    }
  }
};
</script>
<style scoped>
.mainTag {
  overflow: hidden;
}
.mainTag:hover {
  overflow-x: auto;
  overflow-y: hidden;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0.333vw;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.333vw;
}
</style>

