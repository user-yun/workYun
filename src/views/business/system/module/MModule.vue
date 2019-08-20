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
      <el-table-column align="left" width="160" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="160" prop="id" label="id" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="160" prop="pid" label="pid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.pid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="160" prop="devid" label="devid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.devid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="160" prop="zoneid" label="zoneid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.zoneid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="100" prop="pcode" label="pcode" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.pcode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="100" prop="project" label="project" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.project}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="80" prop="type" label="type" sortable></el-table-column>
      <el-table-column width="110" prop="param" label="param" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="remark" label="remark" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="status" label="status" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="report" :formatter="formatter" label="report" sortable></el-table-column>
      <el-table-column width="110" prop="ingress" label="ingress" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="egress" label="egress" :formatter="formatter" sortable></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "module",
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
    this.moduleShowlist();
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
    moduleShowlist(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/module/showlist/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

