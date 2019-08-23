<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="MModuleDataConfig"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import MModuleDataConfig from "./MModuleDataConfig";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "module",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  data() {
    return {
      tableData: [],
      MModuleDataConfig: {},
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MModuleDataConfig = MModuleDataConfig;
    this.moduleShowlist();
  },
  computed: {},
  watch: {},
  methods: {
    formatter(row, column) {
      let data = row[column.property];
      return this.dataFormat(data);
    },
    cellDblClick(r, c) {
      this.rowData = this.cellDataFormat(r, c);
      this.show = true;
    },
    onColse(value) {
      this.show = value;
    },
    moduleShowlist(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/module/showlist/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

