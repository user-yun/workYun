<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-row>
      <el-col :span="8">
        <ProOrgSearch @proOrg="proOrgSelect"></ProOrgSearch>
      </el-col>
      <el-col :span="8">
        {{language.timeSlotEnquiry}}
        <DatePickerMult :dayNum="31" @change="pickerChange" :default="false" :clearable="true"></DatePickerMult>
      </el-col>
      <el-col :span="8">
        <mdb type="primary" icon="el-icon-search" @click="searchRecharge"></mdb>
      </el-col>
    </el-row>
    <div style="height:90%">
      <UiPageTable
        ref="rechargeTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./RechargeRecordDataConfig.js').default()"
        @clickPage="clickPage"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "rechargeRecord",
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        disabled: false
      },
      dataList: [],
      selectDate: [],
      page: 1,
      pageSize: 30,
      total: 0,
      selectInfo: {}
    };
  },
  computed: {
    PageConfig() {
      return {
        total: this.total,
        size: this.pageSize
      };
    }
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult"),
    ProOrgSearch: () => import("#/multiplexing/proorgsearch/ProOrgSearch")
  },
  methods: {
    searchRecharge() {
      this.$refs.rechargeTable.resetPage();
    },
    proOrgSelect(o) {
      this.selectInfo = o;
    },
    pickerChange(t) {
      this.selectDate = t;
    },
    clickPage(d, l) {
      this.page = d;
      this.pageSize = l;
      this.postRequest();
    },
    postRequest() {
      let orgId = this.selectInfo.orgid;
      let project = this.selectInfo.userProject;
      let selectTime = this.selectDate;
      this.post("/api/get_order", {
        project: project ? project : undefined,
        orgId: orgId ? orgId : undefined,
        startTime: selectTime ? selectTime[0] : undefined,
        endTime: selectTime ? selectTime[1] : undefined,
        payStatus: -1,
        rechargeWay: -1,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.dataList = res.Data.body;
        this.total = res.Data.total;
      });
    }
  },
  mounted() {
    this.postRequest();
  }
};
</script>