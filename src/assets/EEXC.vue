<template>
  <span @click="EEXCOut">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "EEXC",
  data() {
    return {};
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = require("@/color.js");
    //     return colors[Math.ceil(Math.random() * colors.length - 1)];
    //   }
    // }
  },
  computed: {
    // test() {
    //   let data = null;
    //   return data;
    // }
  },
  methods: {
    EEXCOut() {
      require("@/function/excel.js").default();
    }
  },
  mounted() {
    //渲染
  }
};
</script>
