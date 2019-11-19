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
            <span class="float-l">{{language[item.text]}}</span>
            <span class="float-r option-r">{{item.value}}</span>
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
        <mdb
          @click="SubMerchantsShowFun(1)"
          class="margin1vw-r"
          :disabled="selectTableItem.Status!=0"
        >{{language.continueAuthSign}}</mdb>
        <mdb @click="SubMerchantsShowFun(2)">{{language.subMerchantsAdd}}</mdb>
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
    <SubMerchants
      v-if="SubMerchantsShow"
      :show="SubMerchantsShow"
      :data="SubMerchantsData"
      @onColse="SubMerchantsShowFun"
    ></SubMerchants>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "subMerchantsList",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult"),
    SubMerchants: () => import("./SubMerchants")
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
      firstEntry: true,
      selectTableItem: {},
      SubMerchantsData: {},
      SubMerchantsShow: false
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
    SubMerchantsShowFun(i) {
      if (i == 1) {
        this.SubMerchantsData = this.selectTableItem;
        this.$set(this.SubMerchantsData, "stepsActive", 1);
      } else if (i == 2) {
        this.SubMerchantsData = {};
      } else if (!i) {
        this.SubMerchantsShow = i;
        return;
      }
      this.SubMerchantsShow = true;
    },
    selectTable(t) {
      this.selectTableItem = t.length > 0 ? t[0] : {};
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
          that.dataList = [];
          let data = res.Data.data;
          that.dataList = data;
          if (data != null) {
            that.dataList.forEach(e => {
              //二级商户类型处理
              let SubMerType =
                that.language[
                  that.otherInfo.subMerchantsTypeList.itemByValue(
                    "value",
                    e.Submertype,
                    "text"
                  )
                ];
              //负责人证件类型
              let CertificateType =
                that.language[
                  that.otherInfo.personInChargeCertificatesTypeList.itemByValue(
                    "value",
                    e.Certificatetype,
                    "text"
                  )
                ];
              //企业证件类型
              let MerCertificateType =
                that.language[
                  that.otherInfo.enterpriseCertificatesTypeList.itemByValue(
                    "value",
                    e.Mercertificatetype,
                    "text"
                  )
                ];
              //收款账户类型
              let ReceiveAccountType =
                that.language[
                  that.otherInfo.receiveAccountTypeList.itemByValue(
                    "value",
                    e.Receiveaccounttype,
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
              that.$set(e, "SubmertypeText", SubMerType);
              that.$set(e, "CertificatetypeText", CertificateType);
              that.$set(e, "MercertificatetypeText", MerCertificateType);
              that.$set(e, "ReceiveaccounttypeText", ReceiveAccountType);
              that.$set(e, "StatusText", Status);
            });
          }
          that.total = res.Data.total;
        });
    }
  },
  mounted() {}
};
</script>