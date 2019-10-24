<template>
  <span>
    <el-divider content-position="left">
      <i class="el-icon-scissors"></i>
      <span class="normal">{{language.printBodyTips}}</span>
    </el-divider>
    <span id="PrintBody">
      <slot></slot>
    </span>
    <el-divider content-position="right">
      <span class="normal">{{language.printBodyTips}}</span>
      <i class="el-icon-scissors"></i>
    </el-divider>
  </span>
</template>

<script>
export default {
  name: "PrintBody",
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  }
};
</script>