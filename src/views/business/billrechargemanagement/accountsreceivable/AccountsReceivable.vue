<template>
  <el-row style="height:100%;" class="alnlft">
    <Title>{{language.accountsReceivable}}</Title>
    <el-col :span="6" :offset="18" style="height:5%">
      <el-button :disabled="disabledButton" type="primary" @click="excelOut">{{excelExportButton}}</el-button>
    </el-col>
    <el-col :span="24" style="height:90%">
      <PageTable
        ref="billExcel"
        :tableData="tableData"
        :TableConfig="TableConfig"
        :DataConfig="require('./AccountsReceivableDataConfig.js').default()"
        @select="tableSelect"
      ></PageTable>
    </el-col>
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
      buttonText: ""
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    Title: () => import("@/assets/Title.vue")
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
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      let that = this;
      this.get(`/bill/project/${userProject}/0/0`, {}).then(res => {
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
    this.getRequest();
  },
  mounted() {
    //渲染
  }
};
</script>