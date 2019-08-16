<template>
  <div style="height:100%">
    <el-table :data="tableData" border height="100%" @cell-dblclick="cellDblClick">
      <el-table-column align="right" width="100" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="200" prop="id" label="id" sortable></el-table-column>
      <el-table-column align="right" width="210" prop="orgid" label="orgid" sortable></el-table-column>
      <el-table-column align="left" width="110" prop="date" label="date" sortable></el-table-column>
      <el-table-column
        align="left"
        width="190"
        prop="param"
        label="param"
        sortable
        :formatter="formatter"
      ></el-table-column>
      <el-table-column align="right" width="90" prop="status" label="status" sortable></el-table-column>
      <el-table-column
        align="right"
        width="200"
        prop="price"
        :formatter="formatter"
        label="price"
        sortable
      ></el-table-column>
      <el-table-column
        align="right"
        width="100"
        prop="obs"
        :formatter="formatter"
        label="obs"
        sortable
      ></el-table-column>
      <el-table-column
        align="left"
        width="200"
        prop="zbs"
        :formatter="formatter"
        label="zbs"
        sortable
      ></el-table-column>
      <el-table-column
        align="left"
        width="100"
        prop="sum"
        :formatter="formatter"
        label="sum"
        sortable
      ></el-table-column>
      <el-table-column
        align="left"
        width="190"
        prop="record"
        label="record"
        :formatter="formatter"
        sortable
      ></el-table-column>
      <el-table-column width="160" prop="items" label="items" :formatter="formatter" sortable></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "enterpriseSummary",
  components: {
    MBusinessDialog: () =>
      import("@/views/business/system/business/MBusinessDialog")
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
    formatter(row, column) {
      let data = row[column.property];
      switch (typeof data) {
        case "string":
          return data.substr(0, 10);
        case "number":
          return data.toFixed(2);
        default:
          return;
      }
    },
    cellDblClick(row, column) {
      this.rowData = row[column.property];
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

