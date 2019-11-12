<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div style="height:90%">
      <UiPageTable
        ref="entryDetailsSummaryTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./EntryDetailsSummaryDataConfig.js').default()"
        @clickPage="clickPage"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "entryDetailsSummary",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable")
  },
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        disabled: false
      },
      dataList: [],
      page: 1,
      pageSize: 30,
      total: 0
    };
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
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
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
  mounted() {}
};
</script>