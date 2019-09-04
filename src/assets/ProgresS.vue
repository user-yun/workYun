<template>
  <span>
    <span v-for="(item,i) in l" :key="i+list.length" :style="{color:item.color}">
      {{item.name}}
      <span v-show="showNum">：{{item.num}}</span>
      <el-progress :percentage="item.num" :color="item.color" :stroke-width="width"></el-progress>
    </span>
  </span>
</template>

<script>
export default {
  name: "ProgresS",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => {
        let s = [
          { name: "12", num: 12, color: "#f00" },
          { name: "75", num: 75, color: "#ff0" },
          { name: "103", num: 103, color: "#f0f" },
          { name: "59", num: 59, color: "#0f0" },
          { name: "89", num: 89, color: "#00f" }
        ];
        return s;
      }
    },
    width: {
      type: Number,
      default: 12
    },
    showNum: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    l() {
      let l = [];
      let sum = this.list.operation("num");
      this.list.forEach(e => {
        let o = {
          name: e.name,
          num: Math.floor((e.num / sum) * 100),
          color: e.color
        };
        console.log(o);
        l.push(o);
      });
      return l;
    }
  },
  created() {},
  methods: {},
  mounted() {
    //渲染
  }
};
</script>