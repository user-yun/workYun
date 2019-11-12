<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div style="height:94%">
      <PageTable
        :tableData="tableData"
        :DataConfig="require('./MBusinessDataConfig.js')"
        @cellDblClick="cellDblClick"
      ></PageTable>
    </div>
    <component v-if="show" :is="is" :show="show" :data="rowData" @onColse="onColse"></component>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "business",
  components: {
    MBusinessDialog: () => import("#/system/business/MBusinessDialog"),
    PageTable: () => import("@/assets/PageTable.vue")
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

