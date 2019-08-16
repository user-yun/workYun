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
      <el-table-column align="left" width="110" prop="Title" label="Title" fixed></el-table-column>
      <el-table-column align="left" width="120" prop="Id" label="Id">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" prop="Zonids" label="Zonids">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Zonids}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="130" prop="Surplusmoney" label="Surplusmoney"></el-table-column>
      <el-table-column align="right" width="90" prop="Param.contact" label="contact"></el-table-column>
      <el-table-column align="right" width="110" prop="Param.phone" label="phone">
        <template slot-scope="scope">
          <span class="ignore">{{scope.row.Param.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="100" prop="Param.pricepublic" label="pricepublic"></el-table-column>
      <el-table-column width="140" prop="Param.pricewaterpublic" label="pricewaterpublic"></el-table-column>
      <el-table-column align="right" width="90" prop="Param.paymode" label="paymode"></el-table-column>
      <el-table-column align="right" width="90" prop="Param.balance" label="balance"></el-table-column>
      <el-table-column align="right" width="80" prop="Param.area" label="area"></el-table-column>
      <el-table-column align="right" width="80" prop="Status" label="Status"></el-table-column>
    </el-table>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "organization",
  components: {
    MOrgHistoryDialog: () =>
      import("@/views/business/system/orghistory/MOrgHistoryDialog")
  },
  data() {
    return {
      tableData: [],
      is: "MOrgHistoryDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.allOrg();
  },
  methods: {
    rowDblclick(row, column) {
      this.rowData = row;
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    allOrg(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/org/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  }
};
</script>

