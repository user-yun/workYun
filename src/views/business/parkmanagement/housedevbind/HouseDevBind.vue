<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="6" :md="4" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="6" :md="7" :xl="6">
      <MDeviceTree @MDeviceTree="MDeviceTreeClick"></MDeviceTree>
    </el-col>
    <el-col :sm="12" :md="13" :xl="15" style="height:94%">
      <el-form label-width="20%">
        <el-form-item :label="language.curOptHou">{{zoneData.Title}}</el-form-item>
        <el-form-item :label="language.curOptDev">{{devData.Title}}{{devData.Pcode}}</el-form-item>
        <!-- <el-form-item>
            <el-input v-model="devId" clearable :maxlength="30" style="width:80%"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-radio-group v-model="shareTreeNode">
            <el-radio
              v-for="(item,index) in otherInfo.shareTreeNodeList"
              :key="index+item.value"
              :label="item.value"
            >{{language[item.text]}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <mdb type="primary" @click="getRequest">{{language.houseDevBind}}</mdb>
        </el-form-item>
      </el-form>
      <div style="height:75%" v-if="bindList">
        <PageTable :tableData="bindList" :DataConfig="require('./HouseDevBindDataConfig.js')"></PageTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "houseDevBind",
  data() {
    return {
      bindList: null,
      zoneData: {},
      devData: {},
      shareTreeNode: 1,
      devId: "",
      level: 1
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    MDeviceTree: () => import("#/multiplexing/devicetree/MDeviceTree.vue"),
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue")
  },
  methods: {
    MDeviceTreeClick(d) {
      this.devData = d;
    },
    MFloorTreeClick(t, l) {
      this.level = l;
      this.zoneData = t;
    },
    getZoneBindList() {
      let that = this;
      let userProject = that.userInfo.userProject;
      that.get(`/zonemodule/list/${userProject}`, {}).then(res => {
        that.bindList = res.Data;
        that.bindList.forEach(e => {
          let typeText =
            that.language[
              that.otherInfo.shareTreeNodeList.itemByValue(
                "value",
                e.ModuleFuncType,
                "text"
              )
            ];
          that.$set(e, "type", typeText);
        });
      });
    },
    getRequest() {
      let that = this;
      let Project = that.userInfo.userProject;
      let Zoneid = that.zoneData.Id;
      let Pcode = that.devData.Pcode;
      that
        .post(`/zonemodule/create`, {
          Project,
          Zoneid,
          Pcode,
          Level: that.level,
          ModuleFuncType: that.shareTreeNode
        })
        .then(res => {
          that.getZoneBindList();
        });
    }
  },
  mounted() {
    this.getZoneBindList();
  }
};
</script>