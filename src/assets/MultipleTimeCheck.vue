<template>
  <span>
    <el-radio-group v-model="iTL" :fill="colors[iTL]">
      <el-radio-button v-for="(tv,ti) in TL" :label="tv.value" :key="ti">{{language[tv.text]}}</el-radio-button>
    </el-radio-group>
    <!-- <el-checkbox-group v-model="iTL" :fill="colors[iTL]">
      <el-checkbox-button
        v-for="(tv,ti) in TL"
        :true-label="tv.value"
        :key="ti"
      >{{language[tv.text]}}</el-checkbox-button>
    </el-checkbox-group>-->
    <el-row>
      <el-col :span="span" v-for="(oitem,oindex) in ML" :key="oindex">
        <el-checkbox-group :value="true" :fill="colors[oitem.type]" @change="groupChange(oindex)">
          <el-checkbox-button :label="oitem.value">{{oitem.text?oitem.text:oitem.value}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-row>
  </span>
</template>
<script>
export default {
  name: "MultipleTimeCheck",
  data() {
    return {
      colors: ["#409EFF", "#F56C6C", "#E6A23C", "#909399", "#67C23A"],
      iTL: 1
    };
  },
  props: {
    ML: {
      type: Array,
      default: () => {
        let ML = [
          { type: 1, value: 0, text: "0时段" },
          { type: 1, value: 1, text: "1时段" },
          { type: 1, value: 2, text: "2时段" },
          { type: 1, value: 3, text: "3时段" },
          { type: 2, value: 4, text: "4时段" },
          { type: 2, value: 5, text: "5时段" },
          { type: 2, value: 6, text: "6时段" },
          { type: 2, value: 7, text: "7时段" },
          { type: 3, value: 8, text: "8时段" },
          { type: 3, value: 9, text: "9时段" },
          { type: 3, value: 10, text: "10时段" },
          { type: 4, value: 11, text: "11时段" },
          { type: 4, value: 12, text: "12时段" }
        ];
        return ML;
      }
    },
    span: {
      default: 2
    },
    TL: {
      type: Array,
      default: () => {
        let TL = [
          {
            text: ["tip"],
            value: 1
          },
          {
            text: ["peak"],
            value: 2
          },
          {
            text: ["flat"],
            value: 3
          },
          {
            text: ["valley"],
            value: 4
          }
        ];
        return TL;
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {},
  methods: {
    groupChange(i) {
      this.$set(this.ML[i], "type", this.iTL);
      this.$emit("group", this.ML);
    }
  },
  mounted() {
    //渲染
  }
};
</script>