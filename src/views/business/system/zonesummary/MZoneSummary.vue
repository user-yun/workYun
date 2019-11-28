<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div style="height:94%">
      <UiPageTable
        :tableData="tableData"
        :TableConfig="TableConfig"
        :DataConfig="require('./MZoneSummaryDataConfig.js')"
        @cellDblClick="cellDblClick"
      ></UiPageTable>
    </div>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "regionalSummary",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    UiPageTable: () => import("@/assets/UiPageTable.vue")
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
        disabled: true
      }
    };
  },
  mounted() {
    this.zoneSummaryList();
  },
  computed: {},
  watch: {},
  methods: {
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    zoneSummaryList(val) {
      this.get(`/zone/summarylist`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

