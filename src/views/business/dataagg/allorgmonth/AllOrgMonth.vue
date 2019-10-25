<template>
  <div style="height:95%">
    <mt>{{language.allOrgMonth}}</mt>
    <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
    <div style="height:95%">
      <PageTable
        :tableData="dataList"
        :TableConfig="TableConfig"
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
      dataList: [],
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        disabled: true
      }
    };
  },
  components: {
    PageTable: () => import("@/assets/UiPageTable"),
    DatePicker: () => import("@/assets/DatePicker")
  },
  methods: {
    pickerChange(t) {
      this.selectDate = t;
      this.getRequest();
    },
    clickPage(d, l) {
      console.log(d, l);
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