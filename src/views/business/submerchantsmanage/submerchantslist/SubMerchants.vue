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
      <div class="normal alnrit">{{language.subMerchantsOpenTooltip}}</div>
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
          <!-- <el-form-item :label="language.subMerchantsId" prop="Submerid" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Submerid" clearable :maxlength="30"></el-input>
          </el-form-item>-->
          <el-form-item :label="language.appLoginAccount" prop="Userid" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Userid" clearable :maxlength="16"></el-input>
          </el-form-item>
          <el-form-item :label="language.subMerchantsName" prop="Submername" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Submername" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.subMerchantsType" prop="Submertype" :rules="rules.select">
            <el-select v-model="ruleForm.Submertype" class="form50z80">
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
          <el-form-item
            :label="language.personInChargeName"
            prop="Contactname"
            :rules="rules.input"
          >
            <el-input class="form50z80" v-model="ruleForm.Contactname" clearable :maxlength="4"></el-input>
          </el-form-item>
          <el-form-item
            :label="language.personInChargeCertificatesType"
            prop="Certificatetype"
            :rules="rules.select"
          >
            <el-select v-model="ruleForm.Certificatetype" class="form50z80">
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
          <el-form-item
            :label="language.personInChargeCertificatesNum"
            prop="Certificateno"
            :rules="rules.input"
          >
            <el-input class="form50z80" v-model="ruleForm.Certificateno" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.enterpriseName" prop="Merchantname" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Merchantname" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item
            :label="language.enterpriseCertificatesType"
            prop="Mercertificatetype"
            :rules="rules.select"
          >
            <el-select v-model="ruleForm.Mercertificatetype" class="form50z80">
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
          <el-form-item
            :label="language.enterpriseCertificatesNum"
            prop="Mercertificatenum"
            :rules="rules.input"
          >
            <el-input
              class="form50z80"
              v-model="ruleForm.Mercertificatenum"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="language.receiveName"
            prop="Receiveaccountname"
            :rules="rules.input"
          >
            <el-input
              class="form50z80"
              v-model="ruleForm.Receiveaccountname"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveAccount" prop="Receiveaccount" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Receiveaccount" clearable :maxlength="19"></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveBank" prop="Receivebankname" :rules="rules.input">
            <el-input
              class="form50z80"
              v-model="ruleForm.Receivebankname"
              clearable
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="language.receiveAccountType"
            prop="Receiveaccounttype"
            :rules="rules.select"
          >
            <el-select v-model="ruleForm.Receiveaccounttype" class="form50z80">
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
          <el-form-item :label="language.bankReservePhone" prop="Bankmobilenum" :rules="rules.tel">
            <el-input v-model="ruleForm.Bankmobilenum" clearable :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item :label="language.personInChargePhone">
            <el-input v-model="ruleForm.Mermobilephonenum" clearable :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item :label="language.address">
            <el-input v-model="ruleForm.Address" clearable :maxlength="16"></el-input>
          </el-form-item>
          <el-form-item :label="language.remark">
            <el-input v-model="ruleForm.Remark" clearable :maxlength="16"></el-input>
          </el-form-item>
          <el-form-item
            :label="language.alreadyDeclaredTheThirdParty"
            prop="Announce"
            :rules="rules.boolean"
          >
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
          <el-form-item :label="language.subMerchantsId" prop="Submerid" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Submerid" clearable :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="language.receiveAccount" prop="Receiveaccount" :rules="rules.input">
            <el-input class="form50z80" v-model="ruleForm.Receiveaccount" clearable :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="vCodeOrRandomamount"
            :label="language.vCode"
            prop="vCode"
            :rules="rules.input"
          >
            <el-input class="form50z80" v-model="ruleForm.vCode" clearable :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item
            v-else
            :label="language.paymentAmount"
            prop="randomamount"
            :rules="rules.numTType"
          >
            <el-input class="form50z80" v-model="ruleForm.randomamount" clearable :maxlength="6"></el-input>
          </el-form-item>
          <el-form-item v-if="vCodeOrRandomamount">
            <mdb type @click="againVCodeError">{{language.againVCodeError}}</mdb>
          </el-form-item>
          <el-form-item>
            <mdb
              type="text"
              @click="vCodeOrRandomamount=!vCodeOrRandomamount"
            >{{language.switchVerMode}}</mdb>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <mdb @click="stepsActive--" v-if="stepsActive==1" class="margin1vw-r">{{language.backUpStep}}</mdb>
      <mdb
        @click="submitForm('ruleForm',1)"
        class="margin1vw-r"
        v-if="!ruleForm.Uuid&&stepsActive==0"
      >{{language.subMerchantsOpenApply}}</mdb>
      <mdb
        class="margin1vw-r"
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
      stepsActive: 0,
      vCodeOrRandomamount: true
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
    againVCodeError() {
      let that = this;
      let submerchantno = that.ruleForm.Submerid;
      let account = that.ruleForm.Receiveaccount;
      this.post(
        `/api/client/abc/sendmobilemessage`,
        { account, submerchantno },
        false,
        true
      ).then(res => {});
    },
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
      this.post(
        "/api/client/abc/regsubmerinforequest",
        this.ruleForm,
        false,
        true
      ).then(res => {
        let ijsonString = JSON.parse(res.data.data.ijsonString);
        let TrxResponse = ijsonString.MSG.Message.TrxResponse;
        if (TrxResponse.ReturnCode == "0000") {
          that.$set(that.ruleForm, "Submerid", res.submerid);
          that.stepsActive++;
        } else {
          this.eleNotify(3, TrxResponse.ErrorMessage);
        }
      });
    },
    postRequest() {
      let that = this;
      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;

      let verificationcode = that.ruleForm.vCode;
      let randomamount = that.ruleForm.randomamount;
      if (this.vCodeOrRandomamount) {
        randomamount = undefined;
      } else {
        verificationcode = undefined;
      }
      this.post(
        "/api/client/abc/submerverify",
        {
          account: that.ruleForm.Receiveaccount,
          submerchantno: that.ruleForm.Submerid,
          verificationcode,
          randomamount
        },
        false,
        true
      ).then(res => {});
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        if (this.data.hasOwnProperty("Uuid")) {
          this.ruleForm = this.$avoid(this.data);
          if (this.data.hasOwnProperty("stepsActive")) {
            this.stepsActive = this.data.stepsActive;
          }
        } else {
          this.ruleForm = {};
        }
      }
    }
  },
  created() {}
};
</script>