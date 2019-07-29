<template>
  <section class="shadow">
    <transition>
      <keep-alive :include="[]">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "MainApp",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
</style>