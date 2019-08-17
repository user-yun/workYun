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
      <el-table-column align="right" width="120" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="180" prop="id" label="id" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="180" prop="zoneid" label="zoneid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.zoneid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" width="90" prop="date" label="date" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="address" :formatter="formatter" label="address" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="param" :formatter="formatter" label="param" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="status" label="status" sortable></el-table-column>
      <el-table-column width="140" prop="baseinfo" :formatter="formatter" label="baseinfo" sortable></el-table-column>
      <el-table-column width="110" prop="obss" label="obss" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="zbs" :formatter="formatter" label="zbs" sortable></el-table-column>
      <el-table-column width="110" prop="mbs" label="mbs" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="140" prop="record" label="record" :formatter="formatter" sortable></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "regionalSummary",
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
    this.zoneSummaryList();
  },
  computed: {},
  watch: {},
  methods: {
    formatter(row, column) {
      let data = row[column.property];
      return this.dataFormat(data);
    },
    cellDblClick(row, column) {
      this.rowData = row[column.property];
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

