<template>
  <div class="h997">
    <!-- 5vh -->
    <HelloHeader></HelloHeader>
    <!-- 4vh -->
    <el-col :span="4" v-for="i in 6" :key="i">
      <BriefSee></BriefSee>
      <!-- <BriefSeeS :bsSmall="false"></BriefSeeS> -->
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <ECharts
        id="PostRevenue"
        height="44vh"
        :data="require('@/echartsdata/PostRevenue')('折线图图')"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <VertRollS DHeight="44vh"></VertRollS>
      <!-- <VertRoll DHeight="7vh" :vShowNum="4"></VertRoll> -->
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <ECharts
        height="44vh"
        id="MultiplePillarsChart"
        :data="require('@/echartsdata/MultiplePillarsChart')('折线图图')"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <ECharts
        height="44vh"
        id="PieChart"
        :data="require('@/echartsdata/PieChart')('折线图图')"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <ECharts
        height="44vh"
        id="PolylineChart"
        :data="require('@/echartsdata/PolylineChart')('折线图图')"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :xs="24" :md="12" :lg="8">
      <ECharts
        height="44vh"
        id="RadarChart"
        :data="require('@/echartsdata/RadarChart')('折线图图')"
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
    VertRoll: () => import("@/assets/VertRoll.vue"),
    BriefSee: () => import("@/assets/BriefSee.vue"),
    ECharts: () => import("@/assets/ECharts.vue")
  },
  computed: {},
  methods: {
    clickECharts(p) {},
    beforeunloadFn(e) {
      setLocal("userMemory", {
        userInfo: this.userInfo,
        otherInfo: this.otherInfo,
        language: this.language
      });
      let confirmationMessage = "user-yun";
      (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
      return confirmationMessage;
    }
    // resizeHandler() {
    //   let clientWidth = document.body.clientWidth;
    //   let clientHeight = document.body.clientHeight;
    //   if (clientWidth <= 992 || clientHeight <= 558) {
    //     this.setOtherInfo({ menuCollapse: true });
    //   } else {
    //     this.setOtherInfo({ menuCollapse: false });
    //   }
    // }
  },
  mounted() {
    // this.resizeHandler();
    // window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("beforeunload", this.beforeunloadFn, false);
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("beforeunload", this.beforeunloadFn, false);
  }
};
</script>