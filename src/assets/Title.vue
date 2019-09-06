<template>
  <span
    class="title"
    :style="{background:`linear-gradient(188deg,
          ${backColor} 0%,
          ${backColor} 50%,
          ${'rgba(0, 0, 0, 0)'} 51%,
          ${'rgba(0, 0, 0, 0)'} 100%)`,
          borderLeft:`solid 4px ${backColor}`,
          paddingLeft:`6px`,
          borderRadius: `4px`}"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {};
  },
  props: {
    backColor: {
      type: String,
      default: () => {
        let colors = require("@/color.js");
        return colors[Math.ceil(Math.random() * colors.length - 1)];
      }
    }
  }
};
</script>
