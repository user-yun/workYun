<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="require('./MOrgHistoryDataConfig.js')"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "organization",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  data() {
    return {
      tableData: [],
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.allOrg();
  },
  methods: {
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(v) {
      this.show = v;
    },
    allOrg() {
      let userProject = this.userInfo.userProject;
      this.get(`/org/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  }
};
</script>

