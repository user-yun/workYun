<template>
  <el-row>
    <el-col :sm="6" :md="4" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="6" :md="4" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="14" :xl="10" class="alnlft">
      <el-form label-width="40%">
        <el-form-item :label="language.curOptHou">
          <el-col :span="22">{{zoneTree.Title}}</el-col>
          <el-col :span="2">
            <i class="el-icon-close" @click="zoneCleanFun"></i>
          </el-col>
        </el-form-item>
        <el-form-item :label="language.curOptOrg">
          <el-col :span="22">{{orgTree.Title}}</el-col>
          <el-col :span="2">
            <i class="el-icon-close" @click="orgCleanFun"></i>
          </el-col>
        </el-form-item>
        <el-form-item :label="language.selectDate">
          <el-col :span="22">{{selectDate}}</el-col>
          <el-col :span="2">
            <i class="el-icon-close" @click="dateCleanFun"></i>
          </el-col>
        </el-form-item>
        <el-form-item :label="language.selectDate">
          <DatePickerMult @change="pickerChange"></DatePickerMult>
        </el-form-item>
        <el-form-item :label="language.selectDate">
          <el-button type="primary" @click="getRequest">{{language.inHouseSearch}}</el-button>
        </el-form-item>
      </el-form>
      <div style="height:45vh">
        <PageTable
          :tableData="checkData"
          :DataConfig="require('../orghousbind/OrgHousBindDataConfig.js')"
        ></PageTable>
      </div>
    </el-col>
  </el-row>
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