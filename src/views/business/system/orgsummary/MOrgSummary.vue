<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="MOrgSummaryDataConfig"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
import MOrgSummaryDataConfig from "./MOrgSummaryDataConfig";
export default {
  mixins: [mymixins],
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
      MOrgSummaryDataConfig: {},
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MOrgSummaryDataConfig = MOrgSummaryDataConfig;
    this.orgSummaryList();
  },
  computed: {},
  watch: {},
  methods: {
    formatter(row, column) {
      let data = row[column.property];
      return this.dataFormat(data);
    },
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

