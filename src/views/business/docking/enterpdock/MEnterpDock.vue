<template>
  <el-row>
    <el-col :sm="12" :md="6" :xl="3">
      <MEnterTree @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :sm="12" :md="9" :xl="6" class="alnlft">
      <li class="emphasize creamsLi">{{treeData.Title}}：{{treeData.Id}}</li>
      <li class="creamsLi">
        <el-input
          v-model="outzoneid"
          clearable
          :maxlength="30"
          placeholder="outzoneid"
          style="width:95%"
        ></el-input>
      </li>
      <li class="creamsLi">
        <el-button
          type="primary"
          :disabled="!treeData.Id || outzoneid == '' "
          style="width:95%"
          @click="getRequest"
        >{{language.sure}}</el-button>
      </li>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "enterpDock",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      treeData: {},
      outzoneid: ""
    };
  },
  components: {
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue")
  },
  methods: {
    MEnterTreeClick(data) {
      this.treeData = data;
    },
    getRequest() {
      let zoneid = this.treeData.Id;
      let outzoneid = this.outzoneid;
      this.get(`/org/addoutorgid/${zoneid}/${outzoneid}`, {}).then(res => {});
    }
  },
  mounted() {
    //渲染
  }
};
</script>
<style scoped>
.creamsLi {
  margin-top: 1vh;
  height: 5vh;
  list-style-type: none;
}
</style>