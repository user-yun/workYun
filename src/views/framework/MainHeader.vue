<template>
  <div :style="{backgroundColor:otherInfo.themeBackgroundColor }">
    <el-row type="flex" align="middle" class="hh5">
      <el-col :xs="19" :sm="19" :md="21" :lg="21" :xl="21" class="alnlft">
        <i
          :class="iClassAsideVisible"
          class="icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassAsideVisibleOnClick"
        ></i>
        <i
          :class="iClassMenuCollapse"
          class="icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassMenuCollapseOnClick"
        ></i>
      </el-col>
      <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="3" class="alnlft">
        <i
          class="el-icon-setting icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassDrawerCollapseOnClick"
        ></i>
      </el-col>
    </el-row>
    <ConfigDrawer v-if="otherInfo.drawerVisible"></ConfigDrawer>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainHeader",
  data() {
    return {};
  },
  components: {
    ConfigDrawer: () => import("@/views/framework/ConfigDrawer")
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
    },
    iClassDrawerCollapseOnClick() {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
    }
  }
};
</script>