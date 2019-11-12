<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :span="4">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :span="6">
      <el-form ref="form" :model="housData" label-width="40%">
        <el-form-item :label="language.curOptHou">{{housData.Title}}</el-form-item>
        <el-form-item :label="language.area">
          <el-input type="number" v-model.number="housData.Area" :maxlength="5">
            <span slot="append">{{language.squareMeter}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="theHousLowerAdd">{{language.theHousLowerAdd}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="upTheHous">{{language.upTheHous}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleThehous">{{language.deleThehous}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "housManageMent",
  data() {
    return {
      housData: {}
    };
  },
  components: {
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue")
  },
  methods: {
    MFloorTreeClick(d) {
      this.housData = this.$avoid(d);
    },
    theHousLowerAdd() {},
    upTheHous() {},
    deleThehous() {},
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