<template>
  <div>
    <Header></Header>
    <el-col :span="24">
      <VertRollS :showNum="2"></VertRollS>
    </el-col>
    <el-col :span="20">
      <ECharts id="PolygonalChart" :data="PolygonalChartData"></ECharts>
    </el-col>
    <el-col :span="4">
      <BriefSee></BriefSee>
    </el-col>
    <!-- @click.native="test" -->
  </div>
</template>

<script>
// import md5 from "js-md5";
import PolygonalChart from "@/echartsdata/PolygonalChart";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "HelloWorld",
  components: {
    Header: () => import("@/views/framework/Header.vue"),
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
    resizeHandler(e) {
      // this.log(e.currentTarget.innerHeight);
      // this.log(e.currentTarget.innerWidth);
      let currentWidth = e.currentTarget.innerWidth;
      if (currentWidth <= 992) {
        this.setOtherInfo({ menuCollapse: true });
      } else {
        this.setOtherInfo({ menuCollapse: false });
      }
    }
  },
  created() {
    this.setOtherInfo({
      themeBackgroundColor: "#545c64",
      themeTextColor: "#1bb8ce",
      menuCollapse: false,
      LanguageOpt: "zh-cn"
    });
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
