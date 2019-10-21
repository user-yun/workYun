<template >
  <div class="shadow" style="overflow: auto;">
    <keep-alive :include="otherInfo.routerHistory">
      <router-view :key="key"/>
    </keep-alive>
  </div>
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
    }
  }
};
</script>