<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="6" :md="4" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="6" :md="4" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="8" :xl="10">
      <el-form label-width="40%">
        <el-form-item :label="language.curOptHou">{{zoneTree.Title}}</el-form-item>
        <el-form-item :label="language.curOptOrg">{{orgTree.Title}}</el-form-item>
        <el-form-item>
          <DatePickerMult @change="pickerChange"></DatePickerMult>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRequest">{{language.orgHousBind}}</el-button>
        </el-form-item>
      </el-form>
      <div style="height:55vh" v-if="checkData">
        <PageTable :tableData="checkData" :DataConfig="require('./OrgHousBindDataConfig.js')"></PageTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgHousBind",
  data() {
    return {
      selectDate: [],
      checkData: null,
      zoneTree: {},
      orgTree: {}
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
  },
  methods: {
    MFloorTreeClick(t) {
      this.zoneTree = t;
      this.checkZone();
    },
    MEnterTreeClick(t) {
      this.orgTree = t;
      this.checkZone();
    },
    pickerChange(t) {
      this.selectDate = t;
      this.checkZone();
    },
    checkZone() {
      let that = this;
      let userProject = this.userInfo.userProject;
      let zoneid = this.zoneTree.Id;
      if (zoneid) {
        this.get(
          `/orgcheckin/checkzone/${userProject}/${zoneid}/${
            that.selectDate[0]
          }/${that.selectDate[1]}`,
          {}
        ).then(res => {
          that.checkData = res.Data;
        });
      }
    },
    getRequest() {
      let that = this;
      let userProject = this.userInfo.userProject;
      let orgid = this.orgTree.Id;
      let zoneid = this.zoneTree.Id;
      this.get(
        `/orgcheckin/input/${userProject}/${orgid}/${zoneid}/${
          that.selectDate[0]
        }/${that.selectDate[1]}`,
        {}
      ).then(res => {});
    }
  }
};
</script>