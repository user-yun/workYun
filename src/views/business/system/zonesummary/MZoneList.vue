<template>
  <div style="height:100%;">
    <PageTable
      :tableData="tableData"
      :DataConfig="DataConfig"
      @cellDblClick="cellDblClick"
      @clickPage="clickPage"
    ></PageTable>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
import DataConfig from "./DataConfig.js";
export default {
  mixins: [mymixins],
  name: "region",
  data() {
    return {
      tableData: [],
      DataConfig: []
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable.vue")
  },
  methods: {
    cellDblClick(row, column) {
      console.log(row);
      console.log(column);
    },
    clickPage(page) {
      console.log(page);
    },
    getRequest() {
      let userProject = this.userInfo.userProject;
      this.get(`/zone/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  },
  mounted() {
    //渲染
    this.DataConfig = DataConfig;
    this.getRequest();
  }
};
</script>

