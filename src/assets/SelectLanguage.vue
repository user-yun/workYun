<template>
  <el-select v-model="otherInfo.languageOpt" @change="selectChange" size="mini">
    <el-option v-for="(value,key) in otherInfo.languageList" :key="key" :value="key" :label="value">
      <span style="float: left">{{value}}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{key}}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "SelectLanguage",
  data() {
    return {};
  },
  components: {},
  props: {},
  computed: {
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    }
  },
  watch: {
    "otherInfo.languageOpt": {
      handler(newValue, oldValue) {
        if (!this.isFalse(newValue)) this.getLanguageJson();
      },
      immediate: true, //最初监听
      deep: true //深度监听
    }
  },
  methods: {
    selectChange(value) {
      this.setOtherInfo({
        languageOpt: value
      });
    },
    setOtherInfo(value) {
      //设置其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "setOtherInfo",
        value: value
      });
    },
    async getLanguageJson() {
      let language = await this.$Get(
        "/language/" + this.otherInfo.languageOpt + ".json"
      );
      this.$store.dispatch("upVuex", {
        mutations: "setLanguage",
        value: language
      });
    },
    isFalse(o) {
      if (
        !o ||
        o === "null" ||
        o === "undefined" ||
        o === "false" ||
        o === "NaN"
      )
        return true;
      return false;
    }
  }
};
</script>
<style scoped>
</style>
