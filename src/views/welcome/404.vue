<template>
  <el-card class="h997">
    <el-col :xs="24" :md="12" :xl="6">
      <el-timeline>
        <el-timeline-item
          v-for="(item,index) in timeLineList"
          :key="index"
          :timestamp="item.timestamp"
          :type="item.type"
        >
          <el-card>
            <h4>{{item.title}}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :xs="24" :md="12" :xl="6">
      <el-progress type="circle" :percentage="percentage"></el-progress>
    </el-col>
    <el-col :xs="24" :md="12" :xl="6">567</el-col>
    <el-col :xs="24" :md="12" :xl="6">567</el-col>
  </el-card>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "error-404",
  data() {
    return {};
  },
  computed: {
    timeLineList() {
      let list = [
        {
          timestamp: this.userInfo.lastTime
            ? this.userInfo.lastTime.date
            : "" + new Date(),
          title: "userInfo",
          type: "danger"
        },
        {
          timestamp: this.otherInfo.lastTime
            ? this.otherInfo.lastTime.date
            : "" + new Date(),
          title: "otherInfo",
          type: "warning "
        },
        {
          timestamp: this.language.lastTime
            ? this.language.lastTime.date
            : "" + new Date(),
          title: "language",
          type: "info"
        }
      ];
      return list;
    },
    percentage() {
      let userTime = this.userInfo.lastTime
        ? this.userInfo.lastTime.second
        : new Date().getTime();
      let nowTile = new Date().getTime();
      let time = (nowTile - userTime) / 86400000;
      return Number(time.toFixed(2) * 100);
    }
  }
};
</script>
