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
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#" + this.id),
        xlsxParam
      );
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          "测试.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
  mounted() {
    //渲染
  }
};
</script>
