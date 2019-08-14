<template>
  <div style="height:100%">
    <el-table :data="tableData" border height="100%" @row-dblclick="rowDblclick">
      <el-table-column align="right" width="240" prop="id" label="id"></el-table-column>
      <el-table-column align="right" width="110" prop="project" label="project"></el-table-column>
      <el-table-column align="left" width="90" prop="title" label="title"></el-table-column>
      <el-table-column align="right" width="60" prop="alg" label="alg"></el-table-column>
      <el-table-column align="right" width="90" prop="duty" label="duty"></el-table-column>
      <el-table-column align="right" width="40" prop="code" label="code"></el-table-column>
      <el-table-column align="right" width="40" prop="period" label="period"></el-table-column>
      <el-table-column align="left" width="90" prop="keys" label="keys"></el-table-column>
      <el-table-column align="right" width="60" prop="step" label="step"></el-table-column>
      <el-table-column align="left" width="240" prop="mark" label="mark"></el-table-column>
      <el-table-column align="right" width="160" prop="result" label="result"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "list",
  components: {
    // ShowDialog
  },
  data() {
    return {
      tableData: [],
      // is: "ShowDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.list();
  },
  computed: {},
  watch: {},
  methods: {
    rowDblclick(row, column) {
      this.rowData = row;
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    list(val) {
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

