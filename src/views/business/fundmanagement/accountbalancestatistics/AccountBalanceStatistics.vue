<template>
  <el-row class="title">
    <mt style="margin-bottom:10vh;">{{language[$options.name]}}</mt>
    <el-col :offset="1" :span="4">
      <el-card :header="language.recordedtTotalAmount" style="color:#67C23A">
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.unRecordedtTotalAmount" style="color:#E6A23C">
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.freezingAmount" style="color:#F56C6C">
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <el-card :header="language.settlementAmount" style="color:#409EFF">
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="9" style="margin-top:10vh;">
      <el-card>
        <div slot="header">
          <span>{{language.recordedtTotalAmountMonth}}</span>
          <DatePicker :type="1" class="cardRight" :dayNum="31" @change="pickerChangeMonth"></DatePicker>
        </div>
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="9" style="margin-top:10vh;">
      <el-card>
        <div slot="header">
          <span>{{language.recordedtTotalAmountDay}}</span>
          <DatePicker :dayNum="1" class="cardRight" @change="pickerChangeDay"></DatePicker>
        </div>
        <div>
          <CountTo :start-val="0" :end-val="1321" :duration="duration" :decimals="2"></CountTo>
          {{language.yuan}}
        </div>
      </el-card>
    </el-col>
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
      duration: 1000
    };
  },
  methods: {
    pickerChangeMonth(t) {
      this.log(t);
    },
    pickerChangeDay(t) {
      this.log(t);
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.cardRight {
  float: right;
}
</style>