<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-row class="margin1vw">
      <el-col
        class="normal"
        :span="24"
      >{{language.queryPrompt}}{{language.querySubMerchantsListInfo}}</el-col>
      <el-col class="margin1vw-t" :span="24">
        {{language.settledInTimeSlot}}
        <DatePickerMult
          class="margin1vw-r"
          :dayNum="31"
          :currentNum="1"
          @change="pickerChange"
          :clearable="true"
          style="width:20%"
        ></DatePickerMult>
        {{language.auditState}}
        <el-select v-model="bankAuditState" class="margin1vw-r" style="width:13%">
          <el-option
            v-for="(item,index) in otherInfo.bankAuditStateList"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          >
            <span style="float: left">{{language[item.text]}}</span>
            <span style="float: right; color: #eee">{{item.value}}</span>
          </el-option>
        </el-select>
        {{language.numbersEnquiry}}
        <el-input
          class="margin1vw-r"
          v-model="businessPhoneNum"
          clearable
          :maxlength="30"
          :placeholder="language.businessNumAndPhoneEnquiry"
          style="width:16%"
        ></el-input>
        <mdb @click="searchRecharge" class="margin1vw-r">{{language.query}}</mdb>
        <mdb @click="searchRecharge">{{language.viewDetails}}</mdb>
      </el-col>
    </el-row>
    <div class="margin1vw" style="height:70%;">
      <UiPageTable
        ref="subMerchantsListTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./SubMerchantsListDataConfig.js').default()"
        @clickPage="clickPage"
        @select="selectTable"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "subMerchantsList",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
  },
  data() {
    return {
      businessPhoneNum: "",
      dataList: [],
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        single: true,
        disabled: false
      },
      page: 1,
      pageSize: 30,
      total: 0,
      bankAuditState: 2,
      dateSlot: [],
      firstEntry: true
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
    selectTable(t) {
      this.log(t);
    },
    searchRecharge() {
      this.$refs.subMerchantsListTable.resetPage();
    },
    clickPage(d, l) {
      this.page = d;
      this.pageSize = l;
      this.getRequest();
    },
    pickerChange(t) {
      this.dateSlot = t;
      if (this.firstEntry) {
        this.getRequest();
      }
    },
    getRequest() {
      this.firstEntry = false;
      let that = this;
      that.dataList = [];
      let qnl = that.businessPhoneNum ? that.businessPhoneNum.length : 0; //获取输入框值的长度
      let submerid = qnl != 11 && qnl != 0 ? that.businessPhoneNum : undefined; //长度不为11且不为0，则认为是商户号 （undefined是为了不传字段）
      let phone = qnl == 11 ? that.businessPhoneNum : undefined; //长度为11则认为是手机号
      let startdate = that.dateSlot ? that.dateSlot[0] : undefined; //如果时间段有值则取值
      let enddate = that.dateSlot ? that.dateSlot[1] : undefined;
      let status = that.bankAuditState;

      if (submerid != undefined || phone != undefined) {
        //如果商户号或者手机号有一个有则按照号的为准
        startdate = undefined;
        enddate = undefined;
        status = undefined;
      }

      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      that
        .post(`/api/client/abc/getsubmerinfo`, {
          pagesize: that.pageSize,
          page: that.page,
          submerid,
          phone,
          status,
          startdate,
          enddate
        })
        .then(res => {
          let data = res.Data.data;
          that.dataList = data;
          if (data != null) {
            that.dataList.forEach(e => {
              //二级商户类型处理
              let SubMerType =
                that.language[
                  that.otherInfo.subMerchantsTypeList.itemByValue(
                    "value",
                    e.SubMerType,
                    "text"
                  )
                ];
              //负责人证件类型
              let CertificateType =
                that.language[
                  that.otherInfo.personInChargeCertificatesTypeList.itemByValue(
                    "value",
                    e.CertificateType,
                    "text"
                  )
                ];
              //企业证件类型
              let MerCertificateType =
                that.language[
                  that.otherInfo.enterpriseCertificatesTypeList.itemByValue(
                    "value",
                    e.MerCertificateType,
                    "text"
                  )
                ];
              //收款账户类型
              let ReceiveAccountType =
                that.language[
                  that.otherInfo.receiveAccountTypeList.itemByValue(
                    "value",
                    e.ReceiveAccountType,
                    "text"
                  )
                ];
              //审核状态
              let Status =
                that.language[
                  that.otherInfo.bankAuditStateList.itemByValue(
                    "value",
                    e.Status,
                    "text"
                  )
                ];
              that.$set(e, "SubMerType", SubMerType);
              that.$set(e, "CertificateType", CertificateType);
              that.$set(e, "MerCertificateType", MerCertificateType);
              that.$set(e, "ReceiveAccountType", ReceiveAccountType);
              that.$set(e, "Status", Status);
            });
          }
          that.total = res.Data.total;
        });
    }
  },
  mounted() {}
};
</script>