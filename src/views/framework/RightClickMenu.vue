<template>
  <div
    id="rightClickMenuId"
    class="alnlft"
    :style="`position: fixed;top:${show.y}px;left:${show.x}px;z-index:5235`"
    @mouseleave="runMenu"
    @mouseover="clear"
  >
    <el-button class="menuItem" @click="backUpPage">{{language.backUpPage}}</el-button>
    <el-button class="menuItem" @click="reloadThisPage">{{language.reloadThisPage}}</el-button>
    <el-button
      v-if="isPrint"
      class="menuItem"
      @click="printCurrentElement"
    >{{language.printCurrentElement}}</el-button>
    <el-button class="menuItem" @click="openSetUp">{{language.openSetUp}}</el-button>
    <el-button class="menuItem" @click="signOutLogin">{{language.signOutLogin}}</el-button>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "RightClickMenu",
  data() {
    return {
      rmTime: null,
      printHTML: null,
      show: { x: 0, y: 0 }
    };
  },
  props: {
    RightClickMenu: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      }
    },
    PrintingEle: {
      default: ""
    }
  },
  watch: {
    RightClickMenu: {
      deep: true,
      handler(newv, oldv) {
        this.handShow();
      }
    }
  },
  computed: {
    isPrint() {
      let path = this.PrintingEle.path;
      let eleItem;
      for (let i = 0, l = path.length; i < l; i++) {
        let id = path[i].id;
        if (
          id != "" &&
          id != "app" &&
          id != null &&
          id != undefined &&
          id != "rightClickMenuId"
        ) {
          eleItem = document.getElementById(id);
          this.printHTML = eleItem.innerHTML;
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    backUpPage() {
      this.$router.back();
    },
    reloadThisPage() {
      history.go(0);
    },
    printCurrentElement() {
      let that = this;
      let newwindow = window.open(window.location.href);
      let t = setTimeout(() => {
        newwindow.document.body.innerHTML = that.printHTML;
        newwindow.print();
        newwindow.close();
        clearTimeout(t);
      }, 1000);
    },
    openSetUp() {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
    },
    signOutLogin() {
      this.$router.replace({ name: "login" });
    },
    clear() {
      clearTimeout(this.rmTime);
      this.rmTime = null;
    },
    close() {
      this.clear();
      this.$emit("close");
      window.removeEventListener("click", this.close);
    },
    runMenu() {
      let that = this;
      window.addEventListener("click", this.close);
      if (that.rmTime == null) {
        that.rmTime = setTimeout(() => {
          that.close();
          console.log(1);
        }, 600);
      }
    },
    handShow() {
      let clientWidth = document.body.clientWidth;
      let clientHeight = document.body.clientHeight;
      let rcm = document.getElementById("rightClickMenuId");
      let rcmW = rcm.clientWidth;
      let rcmH = rcm.clientHeight;
      let x = this.RightClickMenu.x;
      let y = this.RightClickMenu.y;
      if (x + rcmW >= clientWidth) {
        this.$set(this.show, "x", x - rcmW);
      } else {
        this.$set(this.show, "x", x);
      }
      if (y + rcmH >= clientHeight) {
        this.$set(this.show, "y", y - rcmH);
      } else {
        this.$set(this.show, "y", y);
      }
    }
  },
  mounted() {
    this.runMenu();
    this.handShow();
  },
  beforeDestroy() {
    this.close();
  }
};
</script>
<style scoped>
.menuItem {
  width: 100%;
  display: block;
  margin: 0;
}
</style>