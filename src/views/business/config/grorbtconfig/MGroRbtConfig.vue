<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="24" :md="12" :xl="6">
      <el-form :model="ruleForm" label-width="40%">
        <el-form-item>
          <el-input
            v-model="ruleForm.RobotToken"
            clearable
            :maxlength="30"
            placeholder="RobotToken"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="ruleForm.GroupNumber"
            clearable
            :maxlength="30"
            placeholder="GroupNumber"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="bind"
            style="width:100%"
            :disabled="bindDis"
          >{{language.sure}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "groRbtConfig",
  data() {
    return {
      ruleForm: {
        GroupNumber: "",
        RobotToken: ""
      }
    };
  },
  mounted() {},
  computed: {
    bindDis() {
      let bool = true;
      if (
        !(
          this.isFalse(this.ruleForm.GroupNumber) ||
          this.isFalse(this.ruleForm.RobotToken)
        )
      ) {
        bool = false;
      }
      return bool;
    }
  },
  watch: {},
  methods: {
    bind() {
      let userProject = this.userInfo.userProject;
      this.post(
        `/robotBind/robotbind/${this.ruleForm.RobotToken}/${
          this.ruleForm.GroupNumber
        }/${userProject}`,
        {}
      ).then(res => {});
    }
  }
};
</script>

