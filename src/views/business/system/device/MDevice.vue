<template>
  <div style="height:96%">
    <mt>{{language.device}}</mt>
    <div style="height:96%">
      <PageTable
        :tableData="tableData"
        :DataConfig="require('./MDeviceDataConfig.js')"
        @cellDblClick="cellDblClick"
      ></PageTable>
    </div>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "device",
  components: {
    PageTable: () => import("@/assets/PageTable.vue"),
    MBusinessDialog: () => import("#/system/business/MBusinessDialog")
  },
  data() {
    return {
      tableData: [],
      is: "MBusinessDialog",
      show: false,
      rowData: null
    };
  },
  mounted() {
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

