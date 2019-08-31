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
    <br>
    <span
      v-for="(oitem,oindex) in ML"
      :key="oindex"
      :style="{background:`${colors[oitem.type]}`}"
      class="themeSpan"
      @click="groupChange(oindex)"
    >{{oitem.text?oitem.text:oitem.value}}</span>
    <!-- <el-row>
      <el-col :span="span" v-for="(oitem,oindex) in ML" :key="oindex">
        <el-checkbox-group :value="true" :fill="colors[oitem.type]" @change="groupChange(oindex)">
          <el-checkbox-button :label="oitem.value">{{oitem.text?oitem.text:oitem.value}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-row>-->
  </span>
</template>
<script>
export default {
  name: "MultipleTimeCheck",
  data() {
    return {
      iTL: 1
    };
  },
  props: {
    ML: {
      type: Array,
      default: () => {
        let ML = [];
        return ML;
      }
    },
    colors: {
      type: Array,
      default: () => {
        return require("@/color.js");
      }
    },
    span: {
      default: 2
    },
    TL: {
      type: Array,
      default: () => {
        let TL = [];
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
<style scoped>
.themeSpan {
  padding: 2px 4px;
  display: inline-block;
  height: 25px;
  min-width: 25px;
  border-radius: 5px;
  /* cursor: not-allowed; */
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
}
</style>