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
          :currentNum="0"
          @change="pickerChange"
          :clearable="true"
          style="width:20%"
        ></DatePickerMult>
        {{language.auditState}}
        <el-select
          v-model="bankAuditState"
          class="margin1vw-r"
          style="width:13%"
          @change="searchRecharge"
        >
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
          @click="handlerDialog(1,selectTableItem)"
          class="margin1vw-r"
          :disabled="selectTableItem.Status!=0||bankAuditState!=0"
          :tooltip="language.continueAuthSignTooltip"
        >{{language.continueAuthSign}}</mdb>
        <mdb @click="handlerDialog(2)" class="margin1vw-r">{{language.subMerchantsAdd}}</mdb>
        <mdb
          @click="queryBalance(selectTableItem)"
          :disabled="!selectTableItem.hasOwnProperty('subMerId')"
        >{{language.queryBalance}}</mdb>
        <!-- <el-dropdown trigger="click">
          <span>
            <mdb
              :tooltip="language.pleaseIsTableSelect"
              :disabled="!selectTableItem.hasOwnProperty('subMerId')"
            >{{language.moreOperations}}</mdb>
          </span>
          <el-dropdown-menu slot="dropdown">
            
          </el-dropdown-menu>
        </el-dropdown>-->
      </el-col>
    </el-row>
    <div class="margin1vw" style="height:80%;">
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
    <component
      v-if="showDialog"
      :is="isDialog"
      :show="showDialog"
      :data="dataDialog"
      @onColse="handlerDialog"
    ></component>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "subMerchantsList",
  components: {
    UiPageTable: () => import("@/assets/UiPageTable"),
    DatePickerMult: () => import("@/assets/DatePickerMult"),
    SubMerchants: () => import("./SubMerchants"),
    SubMerchantsBalance: () => import("./SubMerchantsBalance")
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
      dataDialog: {},
      showDialog: false,
      isDialog: null
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
    queryBalance(d) {
      let that = this;
      that
        .get(`/merchantProcess`, {
          process: "queryBalance",
          subMerId: d.subMerId
        })
        .then(res => {
          that.handlerDialog(3, res.data[0]);
        });
    },
    handlerDialog(i, d) {
      if (i == 1) {
        this.dataDialog = d;
        this.$set(this.dataDialog, "stepsActive", 1);
        this.isDialog = "SubMerchants";
      } else if (i == 2) {
        this.dataDialog = {};
        this.isDialog = "SubMerchants";
      } else if (i == 3) {
        this.dataDialog = d;
        this.isDialog = "SubMerchantsBalance";
      } else if (!i) {
        this.showDialog = i;
        return;
      }
      this.showDialog = true;
    },
    selectTable(t) {
      this.selectTableItem = t.length > 0 ? this.$avoid(t[0]) : {};
    },
    searchRecharge() {
      this.selectTableItem = {};
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
      let subMerId = qnl != 11 && qnl != 0 ? that.businessPhoneNum : undefined; //长度不为11且不为0，则认为是商户号 （undefined是为了不传字段）
      let phone = qnl == 11 ? that.businessPhoneNum : undefined; //长度为11则认为是手机号
      let startdate = that.dateSlot ? that.dateSlot[0] : undefined; //如果时间段有值则取值
      let enddate = that.dateSlot ? that.dateSlot[1] : undefined;
      let status = that.bankAuditState;

      if (subMerId != undefined || phone != undefined) {
        //如果商户号或者手机号有一个有则按照号的为准
        startdate = undefined;
        enddate = undefined;
        status = -1;
      }

      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      that
        // .post(`/api/client/abc/getsubmerinfo`, {
        .get(`/findMerchantInfoAll`, {
          pagesize: that.pageSize,
          page: that.page,
          subMerId,
          phone,
          status,
          startdate,
          enddate
        })
        .then(res => {
          that.dataList = [];
          let data = res.data;
          that.dataList = data;
          if (data != null) {
            that.dataList.forEach(e => {
              //二级商户类型处理
              let SubMerType =
                that.language[
                  that.otherInfo.subMerchantsTypeList.$itemByValue(
                    "value",
                    e.subMerType,
                    "text"
                  )
                ];
              //负责人证件类型
              let CertificateType =
                that.language[
                  that.otherInfo.personInChargeCertificatesTypeList.$itemByValue(
                    "value",
                    e.certificateType,
                    "text"
                  )
                ];
              //企业证件类型
              let MerCertificateType =
                that.language[
                  that.otherInfo.enterpriseCertificatesTypeList.$itemByValue(
                    "value",
                    e.companyCertType,
                    "text"
                  )
                ];
              //收款账户类型
              let ReceiveAccountType =
                that.language[
                  that.otherInfo.receiveAccountTypeList.$itemByValue(
                    "value",
                    e.accountType,
                    "text"
                  )
                ];
              //审核状态
              let Status =
                that.language[
                  that.otherInfo.bankAuditStateList.$itemByValue(
                    "value",
                    e.status,
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
          // that.total = res.Data.total;
        });
    }
  },
  mounted() {}
};
</script>