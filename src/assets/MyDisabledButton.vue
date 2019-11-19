<template>
  <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
    <div class="inblock">
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
    </div>
  </el-tooltip>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "myDisabledButton",
  data() {
    return {
      handlerDisabled: false,
      handlerLoading: false,
      tipDis: false
    };
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    tooltip: {
      type: String,
      default: ""
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
  watch: {
    disabled: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.handlerDisabled = newv;
      }
    },
    loading: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.handlerLoading = newv;
      }
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
    if (this.tooltip == "") {
      this.tipDis = true;
    }
  }
};
</script>