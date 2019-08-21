<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      border
      height="100%"
      @row-dblclick="rowDblclick"
      header-cell-class-name="header-cell-class-name"
      cell-class-name="cell-class-name"
    >
      <el-table-column align="left" width="90" prop="Title" label="Title" fixed>
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" width="170" prop="Param.address" label="address"></el-table-column>
      <el-table-column align="right" width="110" prop="Pcode" label="Pcode">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Pcode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="170" prop="Pid" label="Pid">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Pid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="70" prop="Param.zone" label="zone"></el-table-column>
      <el-table-column align="right" width="110" prop="Param.zoneid" label="zoneid">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.zoneid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="140" prop="Report.lasttime" label="lasttime">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.lasttime}}</span>
        </template>
      </el-table-column>
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
    MModuleDialog: () => import("#/system/device/MDeviceDialog")
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
    this.allModuleBrief();
  },
  methods: {
    rowDblclick(row, column) {
      this.rowData = row;
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    allModuleBrief(val) {
      let projectId = this.userInfo.projectId;
      this.get(`/zone/allmodulebrief/${projectId}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  }
};
</script>

