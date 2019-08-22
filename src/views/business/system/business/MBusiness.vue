<template>
  <div style="height:100%">
    <PageTable
      :tableData="tableData"
      :DataConfig="MBusinessDataConfig"
      @cellDblClick="cellDblClick"
    ></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import MBusinessDataConfig from "./MBusinessDataConfig";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "business",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  data() {
    return {
      tableData: [],
      MBusinessDataConfig: {},
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MBusinessDataConfig = MBusinessDataConfig;
    this.businessList();
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

