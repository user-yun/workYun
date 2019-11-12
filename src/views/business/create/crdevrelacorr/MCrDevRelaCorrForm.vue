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
    <el-form-item :label="language.equDataSampType">
      <el-select v-model="ruleForm.ftype" disabled style="width:80%">
        <el-option
          v-for="(item,index) in otherInfo.wattMeterList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <mt>{{language.layerLower+language.add}}</mt>
    <el-form-item :label="language.label" prop="name">
      <el-input v-model="ruleForm.name" clearable :maxlength="30" style="width:80%"></el-input>
    </el-form-item>
    <el-form-item :label="language.device" prop="name">
      <el-input v-model="ruleForm.name" clearable :maxlength="30" style="width:80%"></el-input>
    </el-form-item>
    <el-form-item :label="language.equDataSampType" prop="type">
      <el-select v-model="ruleForm.type" style="width:80%">
        <el-option
          v-for="(item,index) in otherInfo.shareTreeNodeList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.shareMethod" prop="mode">
      <el-select v-model="ruleForm.mode" style="width:80%">
        <el-option
          v-for="(item,index) in otherInfo.computationalModelList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.organization">
      1：0.3
      <br>2：0.3
      <br>3：0.4
    </el-form-item>
    <el-form-item>
      <mdb type="danger" :disabled="ruleForm.cl>1">{{language.delete}}</mdb>
      <mdb type="primary" @click="submitForm('ruleForm')">{{language.sure}}</mdb>
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
          this.$set(this.ruleForm, "ftype", newv.type);
          this.$set(this.ruleForm, "id", newv.id);
          this.$set(this.ruleForm, "type", newv.type);
          this.$set(this.ruleForm, "cl", newv.children.length);
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
