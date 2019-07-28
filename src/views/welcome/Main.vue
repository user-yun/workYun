<template>
  <el-container>
    <el-aside :width=" otherInfo.asideVisible ? otherInfo.menuCollapse ? 'auto' : '15%' :'0%' ">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>{{otherInfo}}</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import mymixins from "@/mymixins";
import { setLocal } from "@/function";
export default {
  mixins: [mymixins],
  name: "Main",
  data() {
    return {};
  },
  components: {
    Menu: () => import("@/views/framework/Menu")
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
    // test() {
    //   let data = null;
    //   return data;
    // }
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
      let currentWidth = document.body.clientWidth;
      if (currentWidth <= 992) {
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
    window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
  },
  beforeDestroy() {
    //销毁前
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("beforeunload", e => this.beforeunloadFn(e));
  }
};
</script>
