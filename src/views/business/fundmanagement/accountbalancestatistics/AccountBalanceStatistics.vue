<template>
  <el-row class="title">
    <mt>{{language[$options.name]}}</mt>
    <el-col class="normal" :offset="1" :span="14">{{language.summaryAccountBalanceHints}}</el-col>
    <el-col :offset="1" :span="4">
      <el-select v-model="rechargeMode" multiple class="w100" @visible-change="visibleChange">
        <fragment v-for="(item,index) in otherInfo.rechargeModeList" :key="index+item.value">
          <el-option
            v-if="item.value!=-1 && item.value!=4"
            :value="item.value"
            :label="language[item.text]"
          >
            <span class="float-l">{{language[item.text]}}</span>
            <span class="float-r option-r">{{item.value}}</span>
          </el-option>
        </fragment>
      </el-select>
    </el-col>
    <el-row class="margin5vw-t">
    <el-col :offset="1" :span="4">
      <el-card :header="language.recordedtTotalAmount" style="color:#67C23A">
        <div>
            <CountTo
              :start-val="0"
              :end-val="numSumm.outGoldAll"
              :duration="duration"
              :decimals="2"
            ></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.unRecordedtTotalAmount" style="color:#E6A23C">
        <div>
            <CountTo :start-val="0" :end-val="0" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.freezingAmount" style="color:#F56C6C">
        <div>
            <CountTo :start-val="0" :end-val="0" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.settlementAmount" style="color:#409EFF">
        <div>
            <CountTo
              :start-val="0"
              :end-val="numSumm.enterGoldAll"
              :duration="duration"
              :decimals="2"
            ></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    </el-row>
    <el-row class="margin5vw-t">
      <el-col :offset="1" :span="9">
      <el-card>
        <div slot="header">
          <span>{{language.recordedtTotalAmountMonth}}</span>
            <DatePicker :type="1" class="float-r" :dayNum="31" @change="pickerChangeMonth"></DatePicker>
        </div>
        <div>
            <CountTo
              :start-val="0"
              :end-val="numSumm.outGoldMonth"
              :duration="duration"
              :decimals="2"
            ></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
      <el-col :offset="1" :span="9">
      <el-card>
        <div slot="header">
          <span>{{language.recordedtTotalAmountDay}}</span>
            <DatePicker :dayNum="1" class="float-r" @change="pickerChangeDay"></DatePicker>
        </div>
        <div>
            <CountTo
              :start-val="0"
              :end-val="numSumm.outGoldDay"
              :duration="duration"
              :decimals="2"
            ></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
  </el-row>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "accountBalanceStatistics",
  components: {
    DatePicker: () => import("@/assets/DatePicker"),
    CountTo: () => import("vue-count-to")
  },
  data() {
    return {
      duration: 1000,
      month: null,
      day: null,
      rechargeMode: [5],
      numSumm: {
        enterGoldAll: 0,
        outGoldAll: 0,
        outGoldDay: 0,
        outGoldMonth: 0
      }
    };
  },
  methods: {
    visibleChange(i) {
      if (!i) {
        this.getRequest();
      }
    },
    pickerChangeMonth(t) {
      this.month = t;
      if (this.day != null) {
        this.getRequest();
      }
    },
    pickerChangeDay(t) {
      this.day = t;
      if (this.month != null) {
        this.getRequest();
      }
    },
    getRequest() {
      let that = this;
      // let projectId = this.userInfo.projectId;
      // let userProject = this.userInfo.userProject;
      this.post(`/api/client/abc/inancialstatistics`, {
        rechargeway: that.rechargeMode,
        month: that.month,
        day: that.day
      }).then(res => {
        that.numSumm = res;
      });
    }
  },
  mounted() {}
};
</script>