<template>
  <div style="height:100%">
    <PageTable :tableData="tableData" :DataConfig="MDeviceDataConfig" @cellDblClick="cellDblClick"></PageTable>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
import MDeviceDataConfig from "./MDeviceDataConfig";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "device",
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    MBusinessDialog: () => import("#/system/business/MBusinessDialog")
  },
  data() {
    return {
      tableData: [],
      is: "MBusinessDialog",
      MDeviceDataConfig: {},
      show: false,
      rowData: null
    };
  },
  mounted() {
    this.MDeviceDataConfig = MDeviceDataConfig;
    this.allModuleBrief();
  },
  methods: {
    cellDblClick(r, c) {
      this.show = true;
      if (c.property == "Pid") {
        this.get(`/module/moudulerela/${r.Pid}`, {}).then(res => {
          if (res.ErrCode == 0) {
            this.rowData = res.Data;
          }
        });
      } else {
        this.rowData = this.cellDataFormat(r, c);
      }
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

