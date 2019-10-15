<template>
  <div>
    <DatePickerMult @change="pickerChange"></DatePickerMult>
    <div style="height:84vh">
      <PageTable :tableData="dataList" :DataConfig="require('./AllOrgDayDataConfig.js')"></PageTable>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "allOrgDay",
  data() {
    return {
      selectDate: [],
      dataList: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
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
        `/orgday/orgpowersearch/${userProject}/${that.selectDate[0]}/${
          that.selectDate[1]
        }`,
        {}
      ).then(res => {
        that.dataList = res.Data;
      });
    }
  }
};
</script>