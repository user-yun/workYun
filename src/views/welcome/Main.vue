<template>
  <div @contextmenu.prevent="rightClick">
    <RightClickMenu
      v-if="RightClickMenuShow"
      :RightClickMenu="RightClickMenu"
      :PrintingEle="PrintingEle"
      @close="RightClickMenuClose"
    ></RightClickMenu>
    <el-container class="h997">
      <el-aside :width="asideWidth">
        <MainMenu></MainMenu>
      </el-aside>
      <el-container>
        <el-header style="padding:0;height:auto;">
          <MainHeader></MainHeader>
        </el-header>
        <el-header style="padding:0;height:auto;">
          <MainTag></MainTag>
        </el-header>
        <el-main style="padding:0.2vw 0.5vw;">
          <MainApp class="shadow" style="overflow: auto;"></MainApp>
        </el-main>
        <!-- <el-footer height="5vh">Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { setLocal } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "main-main",
  data() {
    return {
      RightClickMenu: { x: 0, y: 0 },
      RightClickMenuShow: false,
      PrintingEle: null
    };
  },
  components: {
    MainMenu: () => import("@/views/framework/MainMenu"),
    MainHeader: () => import("@/views/framework/MainHeader"),
    MainTag: () => import("@/views/framework/MainTag"),
    MainApp: () => import("@/views/framework/MainApp"),
    RightClickMenu: () => import("@/views/framework/RightClickMenu")
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
    RightClickMenuClose() {
      this.RightClickMenuShow = false;
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
    rightClick(e) {
      this.PrintingEle = e;
      this.$set(this.RightClickMenu, "x", e.x);
      this.$set(this.RightClickMenu, "y", e.y);
      this.RightClickMenuShow = true;
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