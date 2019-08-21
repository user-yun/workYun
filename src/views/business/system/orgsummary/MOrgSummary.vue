<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      border
      height="100%"
      @cell-dblclick="cellDblClick"
      header-cell-class-name="header-cell-class-name"
      cell-class-name="cell-class-name"
    >
      <el-table-column align="right" width="100" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="160" prop="id" label="id" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="160" prop="orgid" label="orgid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.orgid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" width="110" prop="date" label="date" sortable></el-table-column>
      <el-table-column width="110" prop="param" label="param" sortable :formatter="formatter"></el-table-column>
      <el-table-column align="right" width="90" prop="status" label="status" sortable></el-table-column>
      <el-table-column width="110" prop="price" :formatter="formatter" label="price" sortable></el-table-column>
      <el-table-column width="110" prop="obs" :formatter="formatter" label="obs" sortable></el-table-column>
      <el-table-column width="110" prop="zbs" :formatter="formatter" label="zbs" sortable></el-table-column>
      <el-table-column width="110" prop="sum" :formatter="formatter" label="sum" sortable></el-table-column>
      <el-table-column width="110" prop="record" label="record" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="items" label="items" :formatter="formatter" sortable></el-table-column>
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
      import("#/system/business/MBusinessDialog"),
    MOrgHisrElectDialog: () =>
      import("#/system/orgsummary/MOrgHisrElectDialog")
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
      return this.dataFormat(data);
    },
    cellDblClick(row, column) {
      if (column.property == "orgid") {
        this.is = "MOrgHisrElectDialog";
        this.rowData = row;
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

