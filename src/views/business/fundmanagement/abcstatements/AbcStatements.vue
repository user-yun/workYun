<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-row class="margin1vw">
      <el-col class="normal" :span="24">{{language.queryPrompt}}{{language.queryPromptRecordedInfo}}</el-col>
      <el-col class="margin1vw-t" :xl="12" :lg="24">
        {{language.billTimeSlot}}
        <DatePickerMult
          class="margin1vw-r"
          :dayNum="2"
          :currentNum="2"
          @change="pickerChange"
          :clearable="false"
          style="width:32%"
        ></DatePickerMult>
        <!-- {{language.billState}}
        <el-select
          v-model="liquidationState"
          class="margin1vw-r"
          style="width:13%"
          @change="searchRecharge"
        >
          <el-option
            v-for="(item,index) in otherInfo.liquidationStateList"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          >
            <span class="float-l">{{language[item.text]}}</span>
            <span class="float-r option-r">{{item.value}}</span>
          </el-option>
        </el-select>
        {{language.paymentChannel}}
        <el-select v-model="rechargeMode" style="width:18%">
          <el-option
            v-for="(item,index) in otherInfo.rechargeModeList"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          >
            <span class="float-l">{{language[item.text]}}</span>
            <span class="float-r option-r">{{item.value}}</span>
          </el-option>
        </el-select> -->
      </el-col>
      <el-col class="margin1vw-t alnrit" :xl="12" :lg="24">
        <!-- {{language.numbersEnquiry}}
        <el-tooltip :content="language.oddNumAndPhoneEnquiry">
          <el-input
            v-model="queryNumbers"
            clearable
            :maxlength="40"
            :placeholder="language.oddNumAndPhoneEnquiry"
            style="width:35%"
            class="margin1vw-r"
          ></el-input>
        </el-tooltip>
        <mdb class="margin1vw-r" @click="searchRecharge">{{language.query}}</mdb>
        <mdb
          class="margin1vw-r"
          :disabled="selectExcelOut.length<1||liquidationState!=3"
          :tooltip="language.selectLiquidationTooltip"
        >{{language.selectLiquidation}}</mdb> -->
        <mdb
          :disabled="selectExcelOut.length<1"
          @click="excelOut"
          :tooltip="language.excelSelectRecordedInfoTooltip"
        >{{language.excelSelectRecordedInfo}}</mdb>
      </el-col>
    </el-row>
    <div class="margin1vw" style="height:80%;">
      <UiPageTable
        ref="abcStatementsTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./AbcStatementsDataConfig.js').default()"
        @clickPage="clickPage"
        @select="selectTable"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "abcStatements",
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
        multiple: true,
        disabled: false
      },
      dataList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      liquidationState: 2,
      rechargeMode: 5,
      queryNumbers: "",
      dateSlot: [],
      firstEntry: true,
      selectExcelOut: []
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
    excelOut() {
      require("@/excelformat/seeGetExcel.js").default(
        this,
        this.language.abcStatements,
        [
          {
            name: this.language.abcStatements,
            list: this.selectExcelOut
          }
        ],
        require("./AbcStatementsDataConfig.js").default()
      );
    },
    searchRecharge() {
      this.selectExcelOut = [];
      this.$refs.abcStatementsTable.resetPage();
    },
    clickPage(d, l) {
      this.page = d;
      this.pageSize = l;
      this.postRequest();
    },
    selectTable(t) {
      this.selectExcelOut = t;
    },
    pickerChange(t) {
      this.dateSlot = t;
      if (this.firstEntry) {
        this.postRequest();
      }
    },
    postRequest() {
      this.firstEntry = true;
      let that = this;
      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      let qnl = that.queryNumbers ? that.queryNumbers.length : 0; //获取输入框值的长度
      // let orderid = qnl != 11 && qnl != 0 ? that.queryNumbers : undefined; //长度不为11且不为0，则认为是商户号 （undefined是为了不传字段）
      // let phone = qnl == 11 ? that.queryNumbers : undefined; //长度为11则认为是手机号
      let term = qnl != 0 ? that.queryNumbers : undefined;

      let startDate = that.dateSlot ? that.dateSlot[0] : undefined; //如果时间段有值则取值
      let endDate = that.dateSlot ? that.dateSlot[1] : undefined;
      let rechargeway = that.rechargeMode; //充值方式
      let status = that.liquidationState; //账单状态

      if (term != undefined) {
        //如果商户号或者手机号有一个有则按照号的为准
        startDate = undefined;
        endDate = undefined;
        status = -1;
        rechargeway = -1;
      }

      that
        // .post("/api/client/abc/orderinfo", {
        .get("/findStatementsByOrderTime", {
          pagesize: that.pageSize,
          page: that.page,
          // phone,
          // orderid,
          term,
          rechargeway,
          status,
          startDate,
          endDate
        })
        .then(res => {
          that.dataList = [];
          let data = res.data;
          that.dataList = data != null ? data : [];
          // that.dataList.forEach(e => {
            // let typeText =
            //   that.language[
            //     that.otherInfo.rechargeModeList.$itemByValue(
            //       "value",
            //       e.Rechargeway,
            //       "text"
            //     )
            //   ];
            // let statusText =
            //   that.language[
            //     that.otherInfo.liquidationStateList.$itemByValue(
            //       "value",
            //       e.Status,
            //       "text"
            //     )
            //   ];
            // that.$set(e, "PaymentChannel", typeText);
            // that.$set(e, "billState", statusText);
          // });
          // that.total = res.Data.total;
        });
    }
  },
  mounted() {}
};
</script>