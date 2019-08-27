<template>
  <el-row>
    <el-col :sm="12" :md="6" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="12" :md="9" :xl="6">
      {{treeData}}
      <!-- <MCrGeTaPuBoForm :treeData="treeData" @ruleForm="ruleFormHandler"></MCrGeTaPuBoForm> -->
    </el-col>
  </el-row>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "hosDock",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      treeData: {}
    };
  },
  components: {
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue")
  },
  methods: {
    MFloorTreeClick(data) {
      this.treeData = data;
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  mounted() {
    //渲染
  }
};
</script>