<template>
  <el-container>
    <el-aside :width="asideWidth">
      <MainMenu></MainMenu>
    </el-aside>
    <el-container>
      <el-header
        height="5vh"
        :style="{backgroundColor:otherInfo.themeBackgroundColor }"
        class="shadow"
      >
        <MainHeader></MainHeader>
      </el-header>
      <MainTag style="height:4vh"></MainTag>
      <el-main style="height:90vh;padding:0.5vw">
        <MainApp></MainApp>
      </el-main>
      <!-- <el-footer height="5vh">Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import mymixins from "@/mymixins";
import { setLocal } from "@/function";
export default {
  mixins: [mymixins],
  name: "main-main",
  data() {
    return {};
  },
  components: {
    MainMenu: () => import("@/views/framework/MainMenu"),
    MainHeader: () => import("@/views/framework/MainHeader"),
    MainTag: () => import("@/views/framework/MainTag"),
    MainApp: () => import("@/views/framework/MainApp")
  },
  props: {},
  computed: {
    asideWidth() {
      return this.otherInfo.asideVisible
        ? this.otherInfo.menuCollapse
          ? "auto"
          : "11%"
        : "0%";
    }
  },
  watch: {},
  methods: {
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
  created() {
    //创建
  },
  mounted() {
    //渲染
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("beforeunload", this.beforeunloadFn, false);
  },
  beforeDestroy() {
    //销毁前
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("beforeunload", this.beforeunloadFn, false);
  }
};
</script>
<style scoped>
</style>