<template>
  <div style="height:100%">
    <el-table :data="tableData" border height="100%" @row-dblclick="rowDblclick">
      <el-table-column align="left" width="150" prop="Title" label="Title"></el-table-column>
      <el-table-column align="left" width="200" prop="Param.address" label="Param.address"></el-table-column>
      <el-table-column align="right" width="130" prop="Pcode" label="Pcode"></el-table-column>
      <el-table-column align="right" width="240" prop="Pid" label="Pid"></el-table-column>
      <el-table-column align="right" width="70" prop="Param.zone" label="zone"></el-table-column>
      <el-table-column align="right" width="240" prop="Param.zoneid" label="zoneid"></el-table-column>
      <el-table-column align="right" width="170" prop="Report.lasttime" label="lasttime"></el-table-column>
      <el-table-column align="left" width="120" prop="Param.org" label="org"></el-table-column>
      <el-table-column align="right" width="130" prop="Report.powerfactor" label="powerfactor"></el-table-column>
      <el-table-column align="right" width="70" prop="Report.voltage" label="voltage"></el-table-column>
      <el-table-column align="right" width="70" prop="Report.current" label="current"></el-table-column>
      <el-table-column align="right" width="130" prop="Report.activepower" label="activepower"></el-table-column>
      <el-table-column align="right" width="130" prop="Report.reactivepower" label="reactivepower"></el-table-column>
      <el-table-column align="right" width="90" prop="Report.allpower" label="allpower"></el-table-column>
      <el-table-column align="right" width="230" prop="Id" label="moduleId"></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "device",
  components: {
    MModuleDialog: () => import("@/views/business/system/MModuleDialog")
  },
  data() {
    return {
      tableData: [],
      is: "MModuleDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.allmodulebrief();
  },
  methods: {
    rowDblclick(row, column) {
      this.rowData = row;
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    allmodulebrief(val) {
      let projectId = this.userInfo.projectId;
      this.get(`/zone/allmodulebrief/${projectId}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  }
};
</script>

