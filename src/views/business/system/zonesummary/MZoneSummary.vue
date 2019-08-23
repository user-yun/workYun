<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="MZoneSummaryDataConfig"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import MZoneSummaryDataConfig from "./MZoneSummaryDataConfig";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "regionalSummary",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  data() {
    return {
      tableData: [],
      MZoneSummaryDataConfig: {},
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MZoneSummaryDataConfig = MZoneSummaryDataConfig;
    this.zoneSummaryList();
  },
  computed: {},
  watch: {},
  methods: {
    formatter(row, column) {
      let data = row[column.property];
      return this.dataFormat(data);
    },
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    zoneSummaryList(val) {
      this.get(`/zone/summarylist`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

