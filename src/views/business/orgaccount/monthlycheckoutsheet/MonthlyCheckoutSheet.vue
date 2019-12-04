<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div class="normal margin1vw-l">{{language.orgMonthlyCheckoutSheetTooltip}}</div>
    <el-row class="alnrit margin1vw-r">
      <mdb :disabled="!selectTableItem.hasOwnProperty('Bid')">{{language.viewBillDetails}}</mdb>
      <!-- <DatePicker :type="1" :dayNum="31" @change="pickerChange"></DatePicker> -->
    </el-row>
    <div class="margin1vw" style="height:40%;">
      <UiPageTable
        ref="monthlyCheckoutSheet"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./MonthlyCheckoutSheetDataConfig.js').default()"
        @clickPage="clickPage"
        @select="selectTable"
      ></UiPageTable>
    </div>
    <div class="margin1vw" style="height:38%;"></div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "monthlyCheckoutSheet",
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        single: true,
        disabled: true
      },
      page: 1,
      pageSize: 30,
      total: 0,
      dataList: [],
      selectTableItem: {},
      selectDate: "0"
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable")
    // DatePicker: () => import("@/assets/DatePicker")
  },
  computed: {
    PageConfig() {
      return {
        total: this.total,
        size: this.pageSize
      };
    }
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
      this.get(`/bill/org/${orgid}/${that.selectDate}/0`, {}).then(res => {
        let data = res.Data;
        data.forEach(e => {
          that.$set(e, "billingCycle", `${e.Begin}-${e.End}`);
        });
        this.dataList = data;
      });
    }
  },
  mounted() {
    this.getRequest();
  }
};
</script>