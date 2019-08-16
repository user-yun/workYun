<template>
  <div style="height:100%">
    <el-table :data="tableData" border height="100%" @cell-dblclick="cellDblClick">
      <el-table-column align="left" width="90" prop="title" label="title" sortable fixed></el-table-column>
      <el-table-column align="right" width="240" prop="id" label="id" sortable></el-table-column>
      <el-table-column align="right" width="110" prop="project" label="project" sortable></el-table-column>
      <el-table-column align="right" width="140" prop="alg" label="alg" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="duty" label="duty" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="code" label="code" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="period" label="period" sortable></el-table-column>
      <el-table-column align="left" width="90" prop="keys" label="keys" sortable></el-table-column>
      <el-table-column align="right" width="90" prop="step" label="step" sortable></el-table-column>
      <el-table-column align="left" width="240" prop="mark" label="mark" sortable></el-table-column>
      <el-table-column width="160" prop="input" label="input" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="inputsort" label="inputsort" sortable></el-table-column>
      <el-table-column width="240" prop="inputid" label="inputid" sortable></el-table-column>
      <el-table-column width="110" prop="inputduty" label="inputduty" sortable></el-table-column>
      <el-table-column width="120" prop="inputcode" label="inputcode" sortable></el-table-column>
      <el-table-column width="160" prop="inputtitle" label="inputtitle" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="160" prop="output" label="output" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="110" prop="outputsort" label="outputsort" sortable></el-table-column>
      <el-table-column width="240" prop="outputid" label="outputid" sortable></el-table-column>
      <el-table-column width="120" prop="outputduty" label="outputduty" sortable></el-table-column>
      <el-table-column width="120" prop="outputcode" label="outputcode" sortable></el-table-column>
      <el-table-column width="160" prop="outputtitle" label="outputtitle" :formatter="formatter" sortable></el-table-column>
      <el-table-column width="160" prop="param" label="param" :formatter="formatter" sortable></el-table-column>
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
    MBusinessDialog: () => import("@/views/business/system/business/MBusinessDialog")
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
      return row[column.property].substr(0, 20);
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

