<template>
  <div class="h997">
    <HelloHeader></HelloHeader>
    <el-col :span="24">
      <VertRollS :showNum="2"></VertRollS>
    </el-col>
    <el-col :span="20">
      <ECharts id="PolygonalChart" :data="PolygonalChartData" @clickECharts="clickECharts"></ECharts>
    </el-col>
    <el-col :span="4">
      <BriefSee></BriefSee>
    </el-col>
    <!-- @click.native="test" -->
  </div>
</template>

<script>
import PolygonalChart from "@/echartsdata/PolygonalChart";
import { setLocal } from "@/function";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "home",
  components: {
    HelloHeader: () => import("@/views/framework/HelloHeader.vue"),
    VertRollS: () => import("@/assets/VertRollS.vue"),
    BriefSee: () => import("@/assets/BriefSee.vue"),
    ECharts: () => import("@/assets/ECharts.vue")
  },
  computed: {
    PolygonalChartData() {
      let PolygonalChartData = PolygonalChart("折线图");
      return PolygonalChartData;
    }
  },
  methods: {
    clickECharts(p){
      this.log(p)
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