<template>
  <div>
    <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
    <div style="height:84vh">
      <PageTable :tableData="dataList" :DataConfig="require('./AllOrgMonthDataConfig.js')"></PageTable>
    </div>
  </div>
</template>
x``
<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "allOrgMonth",
  data() {
    return {
      selectDate: [],
      dataList: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    DatePicker: () => import("@/assets/DatePicker")
  },
  methods: {
    pickerChange(t) {
      this.selectDate = t;
      this.getRequest();
    },
    getRequest() {
      let that = this;
      let userProject = this.userInfo.userProject;
      this.get(
        `/orgmonth/orgpowersearch/${userProject}/${that.selectDate}`,
        {}
      ).then(res => {
        that.dataList = res.Data;
      });
    }
  }
};
</script>