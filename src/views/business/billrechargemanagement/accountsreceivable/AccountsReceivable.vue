<template>
  <el-row>
    <mt>{{language.accountsReceivable}}</mt>
    <el-row>
      <el-col :span="8">
        <ProOrgSearch @proOrg="proOrgSelect"></ProOrgSearch>
      </el-col>
      <el-col :span="8">
        <DatePicker
          :type="1"
          :dayNum="31"
          @change="pickerChange"
          :default="false"
          :clearable="true"
        ></DatePicker>
      </el-col>
      <el-col :span="8">
        <el-button :disabled="disabledButton" type="primary" @click="excelOut">{{excelExportButton}}</el-button>
      </el-col>
    </el-row>
    <div :span="24" style="height:90%">
      <PageTable
        ref="billExcel"
        :tableData="tableData"
        :TableConfig="TableConfig"
        :DataConfig="require('./AccountsReceivableDataConfig.js').default()"
        @select="tableSelect"
      ></PageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "accountsReceivable",
  data() {
    return {
      tableData: [],
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        multiple: true
      },
      selectBill: [],
      buttonText: "",
      selectInfo: {},
      selectDate: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    DatePicker: () => import("@/assets/DatePicker"),
    ProOrgSearch: () => import("#/multiplexing/proorgsearch/ProOrgSearch")
  },
  computed: {
    excelExportButton() {
      return this.buttonText == ""
        ? this.language.excelExport
        : this.buttonText;
    },
    disabledButton() {
      return this.excelExportButton == this.language.excelExport;
    }
  },
  methods: {
    proOrgSelect(o) {
      this.selectInfo = o;
    },
    pickerChange(t) {
      this.selectDate = t;
      this.getRequest();
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      let that = this;
      // this.get(`/bill/project/${userProject}/0/0`, {}).then(res => {
      this.get(
        `/orgmonth/orgpowersearch/${userProject}/${this.selectDate}`,
        {}
      ).then(res => {
        let data = res.Data;
        data.forEach(e => {
          that.$set(e, "billingCycle", `${e.Begin}-${e.End}`);
        });
        that.tableData = data;
        that.$refs.billExcel.refSelectAll();
      });
    },
    tableSelect(l) {
      if (l.length == this.tableData.length) {
        this.buttonText = this.language.allExcelExport;
      } else if (l.length == 0) {
        this.buttonText = "";
      } else {
        this.buttonText = this.language.selectExcelExport;
      }
      this.selectBill = [].concat([], l);
    },
    excelOut() {
      // require("@/function/tableExcel.js").default("billExcel");//需要xlsx 现在换为了xlsx-style
      require("@/excelformat/seeGetExcel.js").default(
        this,
        "账单",
        [
          {
            name: "账单",
            list: this.selectBill
          }
        ],
        require("./AccountsReceivableDataConfig.js").default()
      );
    }
  },
  created() {
    //创建
  },
  mounted() {
    //渲染
  }
};
</script>