<template>
  <div style="height:100%">
    <PageTable :tableData="tableData" :DataConfig="MPublicBoothDataConfig" @cellDblClick="cellDblClick"></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import MPublicBoothDataConfig from "./MPublicBoothDataConfig.js";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "publicBooth",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
  },
  data() {
    return {
      tableData: [],
      MPublicBoothDataConfig: [],
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MPublicBoothDataConfig = MPublicBoothDataConfig;
    this.getRequest();
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
    getRequest(val) {
      let userProject = this.userInfo.userProject;
      this.get(`/module/modulerelalist/${userProject}`, {}).then(res => {
        if (res.ErrCode == 0) {
          let data = res.Data;
          this.tableData = data;
        }
      });
    }
  }
};
</script>

