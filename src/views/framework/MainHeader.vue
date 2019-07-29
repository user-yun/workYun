<template>
  <el-row>
    <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2" align="left" class="h5l5">
      <i
        :class="iClassAsideVisible"
        style="font-size:1vw"
        :style="{color:otherInfo.themeTextColor}"
        @click="iClassAsideVisibleOnClick"
      ></i>
      <i
        :class="iClassMenuCollapse"
        style="font-size:1vw"
        :style="{color:otherInfo.themeTextColor}"
        @click="iClassMenuCollapseOnClick"
      ></i>
    </el-col>
    <el-col :xs="20" :sm="20" :md="22" :lg="22" :xl="22" align="right" class="h5l5">
      <SelectLanguage></SelectLanguage>
    </el-col>
  </el-row>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "New",
  data() {
    return {};
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
    //     return colors[Math.ceil(Math.random() * colors.length)];
    //   }
    // }
  },
  computed: {
    iClassAsideVisible() {
      return this.otherInfo.asideVisible
        ? "el-icon-s-fold"
        : "el-icon-s-unfold";
    },
    iClassMenuCollapse() {
      return this.otherInfo.menuCollapse ? "el-icon-s-grid" : "el-icon-menu";
    }
  },
  watch: {
    //监听数据变化
    // test: {
    //   deep: true,
    //   immediate: true,
    //   handler(newv, oldv) {}
    // }
  },
  methods: {
    iClassAsideVisibleOnClick() {
      this.setOtherInfo({ asideVisible: !this.otherInfo.asideVisible });
    },
    iClassMenuCollapseOnClick() {
      this.setOtherInfo({ menuCollapse: !this.otherInfo.menuCollapse });
    }
  },
  beforeCreate() {
    //创建前
  },
  created() {
    //创建
  },
  beforeMount() {
    //渲染前
    // this.$forceUpdate();
    // this.$nextTick();
  },
  mounted() {
    //渲染
  },
  activited() {
    //可见
  },
  beforeUpdate() {
    //更新前
  },
  updated() {
    //更新
  },
  beforeDestroy() {
    //销毁前
  },
  destroyed() {
    //销毁
  }
};
</script>
<style scoped>
.test {
}
</style>
