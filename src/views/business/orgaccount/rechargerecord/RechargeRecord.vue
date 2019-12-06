<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div class="normal margin1vw-l">{{language.orgMonthlyCheckoutSheetTooltip}}</div>
    <el-row class="alnrit margin1vw-r">
      <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker>
      <mdb :disabled="!selectTableItem.hasOwnProperty('Bid')">{{language.viewBillDetails}}</mdb>
    </el-row>
    <div class="margin1vw" style="height:80%;">
      <UiPageTable
        ref="orgRechargeRecord"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./RechargeRecordDataConfig.js').default()"
        @clickPage="clickPage"
        @select="selectTable"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgRechargeRecord",
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        single: true,
        disabled: false
      },
      page: 1,
      pageSize: 30,
      total: 1000,
      dataList: [],
      selectTableItem: {},
      selectDate: ""
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePicker: () => import("@/assets/DatePicker")
  },
  computed: {
    PageConfig() {
      return {
        total: this.total,
        size: this.pageSize
      };
    }
  },
  watch: {
    //监听数据变化
    // test: {
    //   deep: true,
    //   immediate: true,
    //   handler(newv, oldv) {}
    // }
  },
  methods: {
    pickerChange(t) {
      this.selectDate = t;
      this.getRequest();
    },
    clickPage(d, l) {
      this.page = d;
      this.pageSize = l;
      this.getRequest();
    },
    selectTable(t) {
      this.selectTableItem = t.length > 0 ? this.$avoid(t[0]) : {};
    },
    getRequest() {
      let that = this;
      let orgid = this.userInfo.userOrgid;
      this.get(
        `/recharge/historymonth/${orgid}/${that.selectDate}/${that.page}/${
          that.pageSize
        }`,
        {}
      ).then(res => {
        let data = res.Data;
        this.dataList = data;
      });
    }
  },
  mounted() {}
};
</script>