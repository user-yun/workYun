<template>
  <el-row style="height:100%;" class="alnlft">
    <el-col :span="24" style="height:5%">
      <Title>{{language.accountsReceivable}}</Title>
    </el-col>
    <el-col :span="19" style="height:55%">
      <PageTable
        :tableData="tableData"
        :DataConfig="require('./AccountsReceivableDataConfig.js').default()"
        @cellDblClick="cellDblClick"
      ></PageTable>
    </el-col>
    <el-col :span="5" style="height:55%">123</el-col>
    <el-col :span="24" style="height:10%">123</el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "accountsReceivable",
  data() {
    return {
      tableData: [],
      rowData: {}
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    Title: () => import("@/assets/Title.vue")
  },
  computed: {
    // test() {
    //   let data = null;
    //   return data;
    // }
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
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
    },
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
    postRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
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