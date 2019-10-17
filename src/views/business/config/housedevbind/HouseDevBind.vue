<template>
  <el-col>
    <el-row>
      <el-col :sm="6" :md="4" :xl="3">
        <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
      </el-col>
      <el-col :sm="6" :md="4" :xl="3">
        <MDeviceTree @MDeviceTree="MDeviceTreeClick"></MDeviceTree>
      </el-col>
      <el-col :sm="12" :md="16" :xl="15">
        <h4>{{language.currentOptions}}：{{zoneData.Title}}</h4>
        <h4>{{language.currentOptions}}：{{devData.Title}}</h4>
        <el-button type="primary" @click="getRequest">{{language.houseDevBind}}</el-button>
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
      devData: {}
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