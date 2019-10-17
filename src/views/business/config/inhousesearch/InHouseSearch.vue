<template>
  <el-col>
    <el-row>
      <el-col :sm="6" :md="4" :xl="3">
        <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
      </el-col>
      <el-col :sm="6" :md="4" :xl="3">
        <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
      </el-col>
      <el-col :sm="12" :md="16" :xl="15" class="icon">
        <span>
          {{language.curOptHou}}：{{zoneTree.Title}}
          <i class="el-icon-close" @click="zoneCleanFun"></i>
        </span>
        <span>
          {{language.curOptOrg}}：{{orgTree.Title}}
          <i class="el-icon-close" @click="orgCleanFun"></i>
        </span>
        <div>
          {{language.selectDate}}：{{selectDate}}
          <i class="el-icon-close" @click="dateCleanFun"></i>
        </div>
        <div>
          <DatePickerMult @change="pickerChange"></DatePickerMult>
        </div>
        <el-button type="primary" @click="getRequest">{{language.inHouseSearch}}</el-button>
        <div style="height:65vh">
          <PageTable
            :tableData="checkData"
            :DataConfig="require('../orghousbind/OrgHousBindDataConfig.js')"
          ></PageTable>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "inHouseSearch",
  data() {
    return {
      selectDate: [],
      checkData: [],
      zoneTree: {
        Title: "",
        Id: "nil"
      },
      orgTree: {
        Title: "",
        Id: "nil"
      }
    };
  },
  components: {
    PageTable: () => import("@/assets/PageTable"),
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue"),
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue"),
    DatePickerMult: () => import("@/assets/DatePickerMult")
  },
  methods: {
    MFloorTreeClick(t) {
      this.zoneTree = Object.assign({}, t);
    },
    MEnterTreeClick(t) {
      if (t.Id) {
        this.orgTree = Object.assign({}, t);
      } else {
        this.$set(this.orgTree, "Title", "");
        this.$set(this.orgTree, "Id", "nil");
      }
    },
    pickerChange(t) {
      this.selectDate = t;
    },
    zoneCleanFun() {
      this.$set(this.zoneTree, "Title", "");
      this.$set(this.zoneTree, "Id", "nil");
    },
    orgCleanFun() {
      this.$set(this.orgTree, "Title", "");
      this.$set(this.orgTree, "Id", "nil");
    },
    dateCleanFun() {
      this.selectDate = [];
      this.selectDate.push("nil", "nil");
    },
    getRequest() {
      let that = this;
      let userProject = that.userInfo.userProject;
      let orgid = that.orgTree.Id;
      let zoneid = that.zoneTree.Id;
      that
        .get(
          `/orgcheckin/search/${userProject}/${orgid}/${zoneid}/${
            that.selectDate[0]
          }/${that.selectDate[1]}`,
          {}
        )
        .then(res => {
          that.checkData = res.Data;
        });
    }
  }
};
</script>