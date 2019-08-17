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
      <el-table-column align="left" width="70" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="160" prop="id" label="id" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="110" prop="project" label="project" sortable></el-table-column>
      <el-table-column align="right" width="140" prop="alg" label="alg" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="duty" label="duty" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="code" label="code" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="period" label="period" sortable></el-table-column>
      <el-table-column align="left" width="90" prop="keys" label="keys" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="step" label="step" sortable></el-table-column>
      <el-table-column align="left" width="180" prop="mark" label="mark" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.mark}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" prop="input" label="input" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="inputsort" label="inputsort" sortable></el-table-column>
      <el-table-column width="160" prop="inputid" label="inputid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.inputid}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" prop="inputduty" label="inputduty" sortable></el-table-column>
      <el-table-column width="120" prop="inputcode" label="inputcode" sortable></el-table-column>
      <el-table-column width="140" prop="inputtitle" label="inputtitle" :formatter="formatter"></el-table-column>
      <el-table-column width="110" prop="output" label="output" :formatter="formatter"></el-table-column>
      <el-table-column width="130" prop="outputsort" label="outputsort" sortable></el-table-column>
      <el-table-column width="160" prop="outputid" label="outputid" sortable>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.outputid}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="outputduty" label="outputduty" sortable></el-table-column>
      <el-table-column width="130" prop="outputcode" label="outputcode" sortable></el-table-column>
      <el-table-column width="140" prop="outputtitle" label="outputtitle" :formatter="formatter"></el-table-column>
      <el-table-column width="110" prop="param" label="param" :formatter="formatter"></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "business",
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
    this.businessList();
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
    businessList(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/business/list/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

