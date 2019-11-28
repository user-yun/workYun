<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="12" :md="6" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="18" :xl="21" style="height:94%">
      <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
      <div style="height:94%">
        <UiPageTable
          :tableData="dataList"
          :DataConfig="require('../allorgmonth/AllOrgMonthDataConfig.js')"
        ></UiPageTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "sinOrgMonth",
  data() {
    return {
      selectDate: [],
      treeData: {},
      dataList: []
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    DatePicker: () => import("@/assets/DatePicker")
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
          `/orgmonth/orgpowersearchorgid/${userProject}/${orgid}/${
            that.selectDate
          }`,
          {}
        ).then(res => {
          that.dataList = res.Data;
        });
      }
    }
  }
};
</script>