<template>
  <el-dialog v-if="show" :visible.sync="show" :before-close="handleClose" destroy-on-close>
    <pre>{{data}}</pre>
    <span slot="footer"></span>
  </el-dialog>
</template>

<script>
export default {
  name: "MBusinessDialog",
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      default: null
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function(nvalue, ovalue) {}
    }
  },
  methods: {
    handleClose() {
      this.$emit("onColse", false);
    }
  }
};
</script>

