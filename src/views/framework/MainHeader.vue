<template>
  <el-row>
    <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2" align="left" class="h5l5">
      <i
        :class="iClassAsideVisible"
        style="font-size:1.3vw"
        :style="{color:otherInfo.themeTextColor}"
        @click="iClassAsideVisibleOnClick"
      ></i>
      <i
        :class="iClassMenuCollapse"
        style="font-size:1.3vw"
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
  name: "mainHeader",
  data() {
    return {};
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  props: {},
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
  watch: {},
  methods: {
    iClassAsideVisibleOnClick() {
      this.setOtherInfo({ asideVisible: !this.otherInfo.asideVisible });
    },
    iClassMenuCollapseOnClick() {
      this.setOtherInfo({ menuCollapse: !this.otherInfo.menuCollapse });
    }
  }
};
</script>