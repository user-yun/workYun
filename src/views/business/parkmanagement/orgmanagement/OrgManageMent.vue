<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :span="4">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :span="6">
      {{orgData}}
      <el-form ref="form" :model="orgData" label-width="40%">
        <el-form-item :label="language.curOptOrg">{{orgData.Title}}</el-form-item>
        <el-form-item :label="language.area">
          <el-input type="number" v-model.number="orgData.Area" :maxlength="5">
            <span slot="append">{{language.squareMeter}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addNewOrg">{{language.addNewOrg}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="upTheOrg">{{language.upTheOrg}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleTheOrg">{{language.deleTheOrg}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgManageMent",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      orgData: {}
    };
  },
  components: {
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue")
  },
  methods: {
    MEnterTreeClick(t) {
      this.orgData = this.$avoid(t);
    },
    addNewOrg() {},
    upTheOrg() {},
    deleTheOrg() {},
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