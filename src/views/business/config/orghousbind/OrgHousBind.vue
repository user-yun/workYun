<template>
  <el-col>
    <el-row>
      <el-col :sm="8" :md="6" :xl="4">
        <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
      </el-col>
      <el-col :sm="8" :md="6" :xl="4">
        <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
      </el-col>
      <el-col :sm="8" :md="12" :xl="16">
        <h4>{{language.currentOptions}}：{{zoneTree.Title}}</h4>
        <h4>{{language.currentOptions}}：{{orgTree.Title}}</h4>
        <h4>{{language.selectDate}}</h4>
        <DatePickerMult @change="pickerChange"></DatePickerMult>
        <el-button type="primary" @click="getRequest">{{language.orgHousBind}}</el-button>
        <div style="height:65vh" v-if="checkData">
          <PageTable :tableData="checkData" :DataConfig="require('./OrgHousBindDataConfig.js')"></PageTable>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgHousBind",
  data() {
    return {
      selectDate: [],
      checkData: [],
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