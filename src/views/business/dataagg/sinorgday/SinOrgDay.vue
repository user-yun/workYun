<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="12" :md="6" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="18" :xl="21" style="height:94%">
      <DatePickerMult @change="pickerChange"></DatePickerMult>
      <div style="height:94%">
        <UiPageTable
          :tableData="dataList"
          :DataConfig="require('../allorgday/AllOrgDayDataConfig.js')"
        ></UiPageTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "sinOrgDay",
  data() {
    return {
      selectDate: [],
      dataList: [],
      treeData: {}
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
  },
  methods: {
    MEnterTreeClick(treeData) {
      this.treeData = treeData;
      this.getRequest();
    },
    pickerChange(t) {
      this.selectDate = t;
      this.getRequest();
    },
    getRequest() {
      let that = this;
      let userProject = this.userInfo.userProject;
      let orgid = this.treeData.Id;
      if (orgid) {
        this.get(
          `/orgday/orgpowersearchorgid/${userProject}/${orgid}/${
            that.selectDate[0]
          }/${that.selectDate[1]}`,
          {}
        ).then(res => {
          that.dataList = res.Data;
        });
      }
    }
  }
};
</script>