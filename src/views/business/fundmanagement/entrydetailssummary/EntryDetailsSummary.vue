<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-row class="margin1vw">
      <span class="normal">{{language.queryPrompt}}{{language.queryPromptRecordedInfo}}</span>
      <el-col class="margin1vw-t" :span="24">
        {{language.timeSlotEnquiry}}
        <DatePickerMult
          :dayNum="31"
          :currentNum="1"
          @change="pickerChange"
          :default="true"
          :clearable="true"
        ></DatePickerMult>
        {{language.liquidationStateEnquiry}}
        <el-select v-model="liquidationState">
          <el-option
            v-for="(item,index) in otherInfo.liquidationStateList"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          >
            <span style="float: left">{{language[item.text]}}</span>
            <span style="float: right; color: #eee">{{item.value}}</span>
          </el-option>
        </el-select>
        {{language.rechargeModeEnquiry}}
        <el-select v-model="rechargeMode">
          <el-option
            v-for="(item,index) in otherInfo.rechargeModeList"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          >
            <span style="float: left">{{language[item.text]}}</span>
            <span style="float: right; color: #eee">{{item.value}}</span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="24">
        {{language.oddNumbersEnquiry}}
        {{language.businessPhoneEnquiry}}
        <mdb type="primary">{{language.excelSelectRecordedInfo}}</mdb>
      </el-col>
    </el-row>
    <div class="margin1vw" style="height:70%;">
      <UiPageTable
        ref="entryDetailsSummaryTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./EntryDetailsSummaryDataConfig.js').default()"
        @clickPage="clickPage"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "entryDetailsSummary",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
  },
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        disabled: false
      },
      dataList: [],
      page: 1,
      pageSize: 30,
      total: 0,
      liquidationState: 2,
      rechargeMode: 5
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
  methods: {
    pickerChange(t) {
      this.log(t);
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  mounted() {}
};
</script>