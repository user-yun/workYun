<template>
  <el-row style="height:100%;" class="alnlft">
    <Title>{{language.accountsReceivable}}</Title>
    <el-col :span="6" :offset="18" style="height:5%">
      <el-button type="primary" @click="excelOut">账单导出</el-button>
    </el-col>
    <el-col :span="24" style="height:90%">
      <PageTable
        :tableData="tableData"
        :DataConfig="require('./AccountsReceivableDataConfig.js').default()"
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
      tableData: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    Title: () => import("@/assets/Title.vue")
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
      });
    },
    excelOut() {
      require("@/excelformat/seeGetExcel.js").default(
        this,
        "账单",
        [
          {
            name: "账单",
            list: this.tableData
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