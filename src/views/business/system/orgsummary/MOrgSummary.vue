<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="require('./MOrgSummaryDataConfig.js')"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "enterpriseSummary",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    MOrgHisrElectDialog: () =>
      import("#/system/orgsummary/MOrgHisrElectDialog"),
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
    this.orgSummaryList();
  },
  computed: {},
  watch: {},
  methods: {
    cellDblClick(r, c) {
      if (c.property == "orgid") {
        this.is = "MOrgHisrElectDialog";
        this.rowData = r;
      } else {
        this.is = "MBusinessDialog";
        this.rowData = this.cellDataFormat(r, c);
      }
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    orgSummaryList(val) {
      this.get(`/org/summarylist`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

