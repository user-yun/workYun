<template>
  <div align="center">
    <el-row style="margin: 2vh 10vw ;width:80%">
      <el-col :span="10">
        <el-input v-model="RobotToken" placeholder="RobotToken"></el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model="GroupNumber" placeholder="GroupNumber"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          @click="bind"
          style="width:100%"
          :disabled="bindDis"
        >{{language.sure}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "groRbtConfig",
  data() {
    return {
      GroupNumber: "",
      RobotToken: ""
    };
  },
  mounted() {},
  computed: {
    bindDis() {
      let bool = true;
      if (!(this.isFalse(this.GroupNumber) || this.isFalse(this.RobotToken))) {
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
        `/robotBind/robotbind/${this.RobotToken}/${this.GroupNumber}/${userProject}`,
        {}
      ).then(res => {});
    }
  }
};
</script>

