<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div style="height:94%">
      <UiPageTable
        :tableData="tableData"
        :TableConfig="TableConfig"
        :DataConfig="require('./MDeviceDataConfig.js')"
        @cellDblClick="cellDblClick"
      ></UiPageTable>
    </div>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "device",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable.vue"),
    MBusinessDialog: () => import("#/system/business/MBusinessDialog")
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

