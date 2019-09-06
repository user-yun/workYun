<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    inline-message
    status-icon
    label-width="30%"
  >
    <el-form-item :label="language.currentOptions" prop="title">
      <span v-show="ruleForm.title">{{ruleForm.title}}</span>
    </el-form-item>
    <el-form-item>{{treeData}}</el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{language.sure}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MCrDevRelaCorrForm",
  data() {
    return {
      ruleForm: {}
    };
  },
  components: {},
  props: {
    treeData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    rules() {
      let obj = {};
      return Object.assign(
        {},
        require("@/function/formValidation.js").default,
        obj
      );
    }
  },
  watch: {
    treeData: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        if (this.ihTrue(newv)) {
          this.$set(this.ruleForm, "title", newv.name);
        }
      }
    },
    ruleForm: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        if (this.ihTrue(newv)) this.$refs["ruleForm"].validate(valid => {});
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("ruleForm", this.ruleForm);
        }
      });
    }
  },
  mounted() {
    //渲染
  }
};
</script>
