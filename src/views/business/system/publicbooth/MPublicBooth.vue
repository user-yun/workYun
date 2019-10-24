<template>
  <el-row style="height:98%">
    <mt>{{language.publicBooth}}</mt>
    <el-col style="height:97%" :span="8">
      <PageTable
        :tableData="tableData"
        :TableConfig="TableConfig"
        :DataConfig="require('./MPublicBoothDataConfig.js')"
        @cellDblClick="cellDblClick"
        @select="tableSelect"
      ></PageTable>
    </el-col>
    <el-col style="height:97%;pointerEvents:none" :span="16">
      <ECharts
        id="publicTree"
        height="100%"
        :data="require('@/echartsdata/TreeChart').default(TreeChartOption,'',TreeChartConfig)"
      ></ECharts>
    </el-col>
    <!-- <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component> -->
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "publicBooth",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue"),
    ECharts: () => import("@/assets/ECharts.vue")
  },
  data() {
    return {
      tableData: [],
      is: "MBusinessDialog",
      show: false,
      rowData: null,
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        single: true
      },
      TreeChartOption: [],
      TreeChartConfig: {
        name: "UpperTitle",
        type: "Sharerole",
        id: "UpperPcode",
        children: "Children"
      }
    };
  },
  mounted() {
    this.getRequest();
  },
  computed: {},
  watch: {},
  methods: {
    tableSelect(l) {
      this.TreeChartOption = [].concat([], [l]);
    },
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    getRequest(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/module/modulerelation/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

