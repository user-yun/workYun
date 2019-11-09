<template>
  <el-row>
    <mt>{{language.allOrgMonth}}</mt>
    <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
    <div style="height:90%">
      <UiPageTable
        :tableData="dataList"
        :TableConfig="TableConfig"
        :DataConfig="require('./AllOrgMonthDataConfig.js')"
        @clickPage="clickPage"
      ></UiPageTable>
    </div>
  </el-row>
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
        disabled: true,
        // button: {
        //   fixed: "right",
        //   label: "manage",
        //   width: 200,
        //   list: [
        //     { text: "add", type: "primary" },
        //     { text: "delete", type: "danger" }
        //   ]
        // }
      }
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
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