<template>
  <div>
    <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
    <div style="height:83vh">
      <PageTable
        :tableData="dataList"
        @select="tableSelect"
        :DataConfig="require('./AllOrgMonthDataConfig.js')"
        @clickPage="clickPage"
      ></PageTable>
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
    tableSelect(d) {
      console.log(d);
    },
    clickPage(d, l) {
      console.log(d);
      console.log(l);
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