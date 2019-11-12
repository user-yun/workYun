<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div style="height:94%">
      <PageTable
        :tableData="tableData"
        :DataConfig="require('./MZoneListDataConfig.js')"
        @cellDblClick="cellDblClick"
      ></PageTable>
    </div>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "region",
  data() {
    return {
      tableData: [],
      is: "MBusinessDialog",
      show: false,
      rowData: {}
    };
  },
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  methods: {
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    getRequest() {
      let userProject = this.userInfo.userProject;
      this.get(`/zone/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.tableData = data;
      });
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

