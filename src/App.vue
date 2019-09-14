<template>
  <div id="app" @mousemove="mousemove">
    <router-view v-if="YouAreSmart" key="app"/>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      YouAreSmart: true,
      KickOutInterval: {},
      KickOutTime: 0,
      KickOutNum: 1000 * 60 * 10
      // KickOutNum: 5000
    };
  },
  methods: {
    mousemove() {
      this.KickOutTime = 0;
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
    },
    setOtherInfo(v) {
      //设置其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "setOtherInfo",
        value: v
      });
    }
  },
  watch: {
    KickOutTime(n) {
      if (n > 3) {
        this.$router.replace({ name: "login" });
        this.KickOutTime = 0;
      }
    },
    $route: {
      handler: function(n, o) {
        if (n.name == "login") {
          clearInterval(this.KickOutInterval);
        } else if (n.name == "home") {
          this.KickOutInterval = setInterval(() => {
            this.KickOutTime++;
          }, this.KickOutNum);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("beforeunload", this.beforeunloadFn, false);
    let i = 1576800000000;
    if (new Date().getTime() > i) {
      this.YouAreSmart = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("beforeunload", this.beforeunloadFn, false);
    clearInterval(this.KickOutInterval);
  }
};
</script>
