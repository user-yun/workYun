<template>
  <el-dialog
    v-if="show"
    :visible.sync="show"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <div slot="title">
      <span class="title">{{ruleForm.Uuid ? language.subMerchantsInfo:language.subMerchantsAdd}}</span>
      <div class="normal alnrit">{{language.subMerchantsOpenTips}}</div>
    </div>
    <el-steps :active="stepsActive" align-center>
      <el-step
        v-for="(item,index) in otherInfo.accountOpeningStepsList"
        :key="index+item.value"
        :title="language[item.text]"
      ></el-step>
    </el-steps>
    <el-form :model="ruleForm" lnline ref="ruleForm" inline-message status-icon label-width="30%">
      <el-row v-if="stepsActive==0">
        <el-col :span="12">
          <!-- :rules -->
          <el-form-item :label="language.subMerchantsId">
            <el-input class="form50z80" v-model="ruleForm.SubMerId" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.subMerchantsName">
            <el-input class="form50z80" v-model="ruleForm.SubMerName" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.subMerchantsType">
            <el-select v-model="ruleForm.SubMerType" class="form50z80">
              <el-option
                v-for="(item,index) in otherInfo.subMerchantsTypeList"
                :key="index+item.value"
                :value="item.value"
                :label="language[item.text]"
              >
                <span class="float-l">{{language[item.text]}}</span>
                <span class="float-r option-r">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.personInChargeName">
            <el-input class="form50z80" v-model="ruleForm.ContactName" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.personInChargeCertificatesType">
            <el-select v-model="ruleForm.CertificateType" class="form50z80">
              <el-option
                v-for="(item,index) in otherInfo.personInChargeCertificatesTypeList"
                :key="index+item.value"
                :value="item.value"
                :label="language[item.text]"
              >
                <span class="float-l">{{language[item.text]}}</span>
                <span class="float-r option-r">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.personInChargeCertificatesNum">
            <el-input class="form50z80" v-model="ruleForm.CertificateNo" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.enterpriseName">
            <el-input class="form50z80" v-model="ruleForm.MerchantName" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.enterpriseCertificatesType">
            <el-select v-model="ruleForm.MerCertificateType" class="form50z80">
              <el-option
                v-for="(item,index) in otherInfo.enterpriseCertificatesTypeList"
                :key="index+item.value"
                :value="item.value"
                :label="language[item.text]"
              >
                <span class="float-l">{{language[item.text]}}</span>
                <span class="float-r option-r">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.enterpriseCertificatesNum">
            <el-input
              class="form50z80"
              v-model="ruleForm.MerCertificateNum"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="language.receiveName">
            <el-input
              class="form50z80"
              v-model="ruleForm.ReceiveAccountName"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveAccount">
            <el-input class="form50z80" v-model="ruleForm.ReceiveAccount" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveBank">
            <el-input
              class="form50z80"
              v-model="ruleForm.ReceiveBankName"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveAccountType">
            <el-select v-model="ruleForm.ReceiveAccountType" class="form50z80">
              <el-option
                v-for="(item,index) in otherInfo.receiveAccountTypeList"
                :key="index+item.value"
                :value="item.value"
                :label="language[item.text]"
              >
                <span class="float-l">{{language[item.text]}}</span>
                <span class="float-r option-r">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.bankReservePhone">
            <el-input v-model="ruleForm.BankMobileNum" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.personInChargePhone">
            <el-input v-model="ruleForm.MerMobilePhoneNum" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.address">
            <el-input v-model="ruleForm.Address" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.remark">
            <el-input v-model="ruleForm.Remark" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.alreadyDeclaredTheThirdParty">
            <el-switch
              v-model="ruleForm.Announce"
              active-value="1"
              :active-text="language.alreadyDeclared"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="stepsActive==1">
        <el-col :span="12">
          <el-form-item :label="language.subMerchantsId">
            <el-input class="form50z80" v-model="ruleForm.SubMerId" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveAccount">
            <el-input class="form50z80" v-model="ruleForm.ReceiveAccount" clearable :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="language.vCode">
            <el-input class="form50z80" v-model="ruleForm.vCode" clearable :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item>
            <mdb type @click="againVCodeError">{{language.againVCodeError}}</mdb>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <mdb @click="stepsActive--" v-if="stepsActive==1">{{language.backUpStep}}</mdb>
      <mdb
        @click="submitForm('ruleForm',1)"
        v-if="!ruleForm.Uuid&&stepsActive==0"
      >{{language.subMerchantsOpenApply}}</mdb>
      <mdb
        @click="submitForm('ruleForm',2)"
        v-if="stepsActive==1"
      >{{language.subMerchantsOpenConfirm}}</mdb>
      <mdb @click="handleClose" type>{{language.cancel}}</mdb>
    </span>
  </el-dialog>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "SubMerchants",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      ruleForm: null,
      stepsActive: 0
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      default: null
    }
  },
  computed: {
    rules() {
      let obj = {};
      return Object.assign(
        {},
        require("@/function/formValidation.js").default,
        obj
      );
    }
  },
  methods: {
    againVCodeError() {},
    handleClose() {
      this.$emit("onColse", false);
    },
    submitForm(f, i) {
      let that = this;
      this.$refs[f].validate(valid => {
        if (valid) {
          if (i == 1) {
            that.regsubmerinforequest();
          } else if (i == 2) {
            that.postRequest();
          }
        }
      });
    },
    regsubmerinforequest() {
      let that = this;
      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      this.post("/api/client/abc/regsubmerinforequest", this.ruleForm).then(
        res => {
          if (res.code == 0) {
            that.stepsActive++;
          }
        }
      );
    },
    postRequest() {
      let that = this;
      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      let verificationcode = that.ruleForm.vCode;
      let randomamount = "";
      this.post("/api/client/abc/submerverify", {
        account: that.ruleForm.ReceiveAccount,
        submerchantno: that.ruleForm.SubMerId,
        verificationcode
      }).then(res => {});
    }
  },
  created() {
    this.ruleForm = this.$avoid(this.data);
  }
};
</script>