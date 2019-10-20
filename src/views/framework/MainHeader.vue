<template>
  <div>
    <el-row>
      <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2" class="h5l5 alnlft">
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
      <el-col :xs="15" :sm="15" :md="19" :lg="19" :xl="19" class="h5l5 alnrit">
        <i
          class="el-icon-setting icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassDrawerCollapseOnClick"
        ></i>
      </el-col>
      <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="3" class="h5l5 alnrit">
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