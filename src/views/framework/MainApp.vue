<template>
  <transition>
    <div class="shadow" style="overflow: auto;">
      <keep-alive :include="keepList">
        <router-view :key="key"/>
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
      for (let k in this.otherInfo.routerHistory) {
        if (this.otherInfo.routerHistory[k].meta.icon) {
          list.push(k);
        }
      }
      return list;
    }
  }
};
</script>