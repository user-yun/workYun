<template>
  <el-row>
    <el-col :sm="8" :md="6" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="8" :md="6" :xl="3">
      <MDeviceTree @MDeviceTree="MDeviceTreeClick"></MDeviceTree>
    </el-col>
    <el-col :sm="8" :md="9" :xl="6">
      <MCrModuRelaForm :treeData="treeData" @ruleForm="ruleFormHandler"></MCrModuRelaForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "crModuRela",
  data() {
    return {
      treeData: {}
    };
  },
  components: {
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue"),
    MDeviceTree: () => import("#/multiplexing/devicetree/MDeviceTree.vue"),
    MCrModuRelaForm: () => import("#/create/crmodurela/MCrModuRelaForm.vue")
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    MFloorTreeClick(treeData) {
      this.$set(this.treeData, "Zongid", treeData.Id);
      this.$set(this.treeData, "Zongtitle", treeData.Title);
      // this.treeData = Object.assign(this.treeData,treeData)
    },
    MDeviceTreeClick(treeData) {
      this.$set(this.treeData, "Pid", treeData.Pid);
      this.$set(this.treeData, "Pcode", treeData.Pcode);
      this.$set(this.treeData, "Type", treeData.Type);
      this.$set(this.treeData, "Status", treeData.Status);
      this.$set(this.treeData, "Orgtitle", treeData.Orgtitle);
      this.$set(this.treeData, "Ptitle", treeData.Title);
      this.$set(this.treeData, "Devid", treeData.Devid);
    },
    ruleFormHandler(formData) {
      this.postRequest(formData);
    },
    postRequest(formData) {
      let userProject = this.userInfo.userProject;
      this.post(`/module/addmodule`, {
        Zongid: formData.Zongid,
        Pid: formData.Pid,
        Pcode: formData.Pcode,
        Title: formData.Title,
        Type: formData.Type,
        Status: formData.Status,
        Devid: formData.Devid
      }).then(res => {});
    }
  },
  mounted() {
    //渲染
  }
};
</script>
