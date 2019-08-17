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
      <el-table-column align="right" width="100" prop="orgtitle" label="orgtitle" sortable fixed></el-table-column>
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
      <el-table-column align="left" width="110" prop="project" label="project" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.project}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" width="90" prop="gover" label="gover" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="status" label="status" sortable></el-table-column>
      <el-table-column align="right" width="200" prop="code" label="code" sortable></el-table-column>
      <el-table-column align="right" width="100" prop="begin" label="begin" sortable></el-table-column>
      <el-table-column align="left" width="100" prop="end" label="end" sortable></el-table-column>
      <el-table-column width="110" prop="sum" :formatter="formatter" label="sum" sortable></el-table-column>
      <el-table-column align="left" width="100" prop="remark" label="remark" sortable></el-table-column>
      <el-table-column width="110" prop="items" label="items" :formatter="formatter" sortable></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "bill",
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
    this.billList();
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
    billList(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/bill/list/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

