<template>
  <transition>
    <div class="shadow" style="overflow: auto;">
      <keep-alive :include="keepList">
        <router-view :key="key" />
      </keep-alive>
    </div>
  </transition>
</template>

<script>
export default {
  name: "mainApp",
  computed: {
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    },
    key() {
      return this.$route.path;
    },
    keepList() {
      let list = [];
      let rh = this.otherInfo.routerHistory;
      for (let k in rh) {
        if (rh[k].meta.icon && !rh[k].meta.noKeepAlive) {
          list.push(k);
        }
      }
      return list;
    }
  }
};
</script>