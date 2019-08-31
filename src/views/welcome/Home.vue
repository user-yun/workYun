<template>
  <div class="h997">
    <HelloHeader></HelloHeader>
    <el-col :span="4" v-for="i in 6" :key="i">
      <BriefSee :bsSmall="false"></BriefSee>
    </el-col>
    <el-col :span="24">
      <VertRollS style="height:20vh" :showNum="4"></VertRollS>
    </el-col>
    <el-col :span="20">
      <ECharts
        id="PolygonalChart"
        :data="require('@/echartsdata/PolygonalChart')('折线图图')"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>

    <!-- @click.native="test" -->
  </div>
</template>

<script>
import { setLocal } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "home",
  components: {
    HelloHeader: () => import("@/views/framework/HelloHeader.vue"),
    VertRollS: () => import("@/assets/VertRollS.vue"),
    BriefSee: () => import("@/assets/BriefSee.vue"),
    ECharts: () => import("@/assets/ECharts.vue")
  },
  computed: {},
  methods: {
    clickECharts(p) {
      this.log(p);
    },
    beforeunloadFn(e) {
      setLocal("userMemory", {
        userInfo: this.userInfo,
        otherInfo: this.otherInfo,
        language: this.language
      });
      let confirmationMessage = "user-yun";
      (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
      return confirmationMessage;
    },
    resizeHandler() {
      let clientWidth = document.body.clientWidth;
      let clientHeight = document.body.clientHeight;
      if (clientWidth <= 992 || clientHeight <= 558) {
        this.setOtherInfo({ menuCollapse: true });
      } else {
        this.setOtherInfo({ menuCollapse: false });
      }
    }
  },
  created() {},
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("beforeunload", this.beforeunloadFn, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("beforeunload", this.beforeunloadFn, false);
  }
};
</script>