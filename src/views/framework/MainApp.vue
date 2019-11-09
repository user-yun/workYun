<template >
  <div class="shadow mainAppContent" style="overflow: auto;">
    <keep-alive :include="include">
      <router-view class="wh100" :key="key"/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "mainApp",
  computed: {
    include() {
      let list = [];
      let rh = this.otherInfo.routerHistory;
      for (let k in rh) {
        if (!rh[k].meta.noKeepAlive) {
          list.push(k);
        }
      }
      return list;
    },
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>