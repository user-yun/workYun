<template >
  <div class="shadow" style="overflow: auto;">
    <keep-alive :include="include">
      <router-view :key="key"/>
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