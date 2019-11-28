<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="6" :md="4" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="6" :md="4" :xl="5">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="8" :xl="10">
      <el-form ref="form" :model="form" lnline inline-message status-icon label-width="40%">
        <el-form-item
          :label="language.curOptHou"
          prop="zoneTitle"
          :rules="rules.select"
        >{{form.zoneTitle}}</el-form-item>
        <el-form-item
          :label="language.curOptOrg"
          prop="orgTitle"
          :rules="rules.select"
        >{{form.orgTitle}}</el-form-item>
        <el-form-item :label="language.paymentMode" prop="Paymode" :rules="rules.select">
          <el-select v-model="form.Paymode" class="form50z80">
            <el-option
              v-for="(item,index) in otherInfo.paymentModelList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span class="float-l">{{language[item.text]}}</span>
              <span class="float-r option-r">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.monthAccountDate" prop="Statementdate" :rules="rules.select">
          <el-select v-model="form.Statementdate" class="form50z80">
            <el-option v-for="i in 30" :key="i" :value="i" :label="i+language.num">
              <span class="float-l">{{i}}</span>
              <span class="float-r option-r">{{language.num}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="language.settledInTimeSlot"
          prop="Contractbdate"
          :rules="rules.select"
        >
          <DatePickerMult :dayNum="0" :currentNum="-180" @change="pickerChange"></DatePickerMult>
        </el-form-item>
        <el-form-item>
          <mdb @click="submitForm('form',0)" class="margin1vw-r">{{language.orgHousBind}}</mdb>
          <mdb @click="submitForm('form',1)">{{language.orgHousBind}}</mdb>
        </el-form-item>
      </el-form>
      <div style="height:50vh" v-if="checkData">
        <PageTable :tableData="checkData" :DataConfig="require('./OrgHousBindDataConfig.js')"></PageTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgHousBind",
  data() {
    return {
      checkData: null,
      form: {
        Paymode: 0,
        Statementdate: 15
      }
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
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
    submitForm(f, i) {
      let that = this;
      this.$refs[f].validate(valid => {
        if (valid) {
          if (i == 0) {
            that.orgcheckininput();
          } else if (i == 1) {
            that.orgcheckin();
          }
        }
      });
    },
    MFloorTreeClick(t) {
      this.$set(this.form, "Zoneid", t.Id);
      this.$set(this.form, "zoneTitle", t.Title);
      this.checkZone();
    },
    MEnterTreeClick(t) {
      this.$set(this.form, "Orgid", t.Id);
      this.$set(this.form, "orgTitle", t.Title);
      this.checkZone();
    },
    pickerChange(t) {
      t = this.$avoid(t);
      this.$set(this.form, "Contractbdate", t[0]);
      this.$set(this.form, "Contractedate", t[1]);
      this.checkZone();
    },
    checkZone() {
      let that = this;
      let userProject = that.userInfo.userProject;
      let Zoneid = that.form.Zoneid;
      if (Zoneid) {
        that
          .get(
            `/orgcheckin/checkzone/${userProject}/${Zoneid}/${
              that.form.Contractbdate
            }/${that.form.Contractedate}`,
            {}
          )
          .then(res => {
            that.checkData = res.Data;
          });
      }
    },
    orgcheckininput() {
      let that = this;
      let userProject = that.userInfo.userProject;
      that
        .get(
          `/orgcheckin/input/${userProject}/${that.form.Orgid}/${
            that.form.Zoneid
          }/${that.form.Contractbdate}/${that.form.Contractedate}`,
          {},
          false,
          true
        )
        .then(res => {});
    },
    orgcheckin() {
      let that = this;
      let Project = that.userInfo.userProject;
      that
        .post(
          `/org/checkin`,
          {
            Project,
            ...that.form
          },
          false,
          true
        )
        .then(res => {});
    }
  }
};
</script>