<template>
  <div style="height:100%;">
    <PageTable
      :tableData="tableData"
      :DataConfig="MZoneListDataConfig"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
import MZoneListDataConfig from "./MZoneListDataConfig.js";
export default {
  mixins: [mymixins],
  name: "region",
  data() {
    return {
      tableData: [],
      MZoneListDataConfig: [],
      is: "MBusinessDialog",
      show: false,
      rowData: {}
    };
  },
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  methods: {
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
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
    this.MZoneListDataConfig = MZoneListDataConfig;
    this.getRequest();
  }
};
</script>

