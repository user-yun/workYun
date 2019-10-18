<template>
  <el-col>
    <el-row>
      <el-col :sm="6" :md="4" :xl="3">
        <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
      </el-col>
      <el-col :sm="6" :md="4" :xl="3">
        <MDeviceTree @MDeviceTree="MDeviceTreeClick"></MDeviceTree>
      </el-col>
      <el-col :sm="12" :md="16" :xl="15" class="title">
        <div>{{language.curOptHou}}：{{zoneData.Title}}</div>
        <div>{{language.curOptDev}}：{{devData.Title}}</div>
        <div>
          <el-input v-model="devId" clearable :maxlength="30" style="width:80%"></el-input>
        </div>
        <el-radio-group v-model="shareTreeNode">
          <el-radio
            v-for="(item,index) in otherInfo.shareTreeNodeList"
            :key="index+item.value"
            :label="item.value"
          >{{language[item.text]}}</el-radio>
        </el-radio-group>
        <div>
          <el-button type="primary" @click="getRequest">{{language.houseDevBind}}</el-button>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "houseDevBind",
  data() {
    return {
      selectDate: [],
      zoneData: {},
      devData: {},
      shareTreeNode: 1,
      devId: ""
    };
  },
  components: {
    MDeviceTree: () => import("#/multiplexing/devicetree/MDeviceTree.vue"),
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue")
  },
  methods: {
    MDeviceTreeClick(d) {
      this.devData = d;
    },
    MFloorTreeClick(t) {
      this.zoneData = t;
    },
    getRequest() {
      let that = this;
      let userProject = this.userInfo.userProject;
      let zoneid = this.zoneData.Id;
      this.get(
        `/orgcheckin/input/${userProject}/${orgid}/${zoneid}/${
          that.selectDate[0]
        }/${that.selectDate[1]}`,
        {}
      ).then(res => {});
    }
  }
};
</script>