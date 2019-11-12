<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon"
    :loading="handlerLoading"
    :disabled="handlerDisabled"
    @click="emtiClick"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "myDisabledButton",
  data() {
    return {
      handlerDisabled: false,
      handlerLoading: false
    };
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "small"
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emtiClick() {
      this.$emit("click");
      this.handlerDisabled = true;
      this.handlerLoading = true;
      let t = setTimeout(() => {
        this.handlerDisabled = false;
        this.handlerLoading = false;
        clearTimeout(t);
      }, 2500);
    }
  },
  mounted() {
    this.handlerDisabled = this.disabled;
    this.handlerLoading = this.loading;
  }
};
</script>