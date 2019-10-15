<template>
  <div>
    <el-col :sm="12" :md="6" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="18" :xl="21">
      <DatePickerMult @change="pickerChange"></DatePickerMult>
      <div style="height:84vh">
        <PageTable
          :tableData="dataList"
          :DataConfig="require('../allorgday/AllOrgDayDataConfig.js')"
        ></PageTable>
      </div>
    </el-col>
  </div>
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
    PageTable: () => import("@/assets/PageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
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
        `/orgday/orgpowersearchorgid/${userProject}/${orgid}/${
          that.selectDate[0]
        }/${that.selectDate[1]}`,
        {}
      ).then(res => {
        that.dataList = res.Data;
      });
    }
  }
};
</script>