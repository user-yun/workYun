<template>
  <div>
    <el-col :sm="12" :md="6" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="18" :xl="21">
      <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
      <div style="height:84vh">
        <PageTable
          :tableData="dataList"
          :DataConfig="require('../allorgmonth/AllOrgMonthDataConfig.js')"
        ></PageTable>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "sinOrgMonth",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      selectDate: [],
      dataList: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    DatePicker: () => import("@/assets/DatePicker")
  },
  methods: {
    MEnterTreeClick(treeData) {
      this.treeData = treeData;
      if (treeData.Id) {
        this.getRequest();
      }
    },
    pickerChange(t) {
      this.selectDate = t;
    },
    getRequest() {
      let that = this;
      let userProject = this.userInfo.userProject;
      let orgid = this.treeData.Id;
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
};
</script>