<template>
  <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
    <div class="inblock" :style="longStyle">
      <el-button
        :type="type"
        :size="size"
        :icon="icon"
        :style="longStyle"
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
  computed: {
    longStyle() {
      let data = "";
      if (this.long == true) {
        data = "width:100%";
      }
      return data;
    }
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
    },
    long: {
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
      let that = this;
      this.$emit("click");
      this.handlerDisabled = true;
      this.handlerLoading = true;
      let t = setTimeout(() => {
        that.handlerDisabled = that.disabled;
        that.handlerLoading = false;
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