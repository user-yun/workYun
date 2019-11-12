<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :sm="12" :md="6" :xl="3">
      <MFloorTree @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :sm="12" :md="9" :xl="6">
      <MCrInTaPuBoForm :treeData="treeData" @ruleForm="ruleFormHandler"></MCrInTaPuBoForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "crInTaPuBo",
  data() {
    return {
      treeData: {}
    };
  },
  components: {
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue"),
    MCrInTaPuBoForm: () => import("#/create/crintapubo/MCrInTaPuBoForm.vue")
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    MFloorTreeClick(treeData) {
      this.treeData = treeData;
    },
    ruleFormHandler(formData) {
      this.postRequest(formData);
    },
    postRequest(formData) {
      let userProject = this.userInfo.userProject;
      this.post(`/zone/createamapport`, {
        zoneid: formData.zoneid,
        title: formData.title,
        preiod: formData.preiod, //计算方式
        code: formData.code,
        sourcecode: formData.sourcecode,
        mode: formData.mode, //分摊方式
        outputduty: formData.outputduty, //设备数据采样类型
        outputcode: formData.outputcode,
        factors: formData.factors //比例信息
      }).then(res => {});
    }
  },
  mounted() {
    //渲染
  }
};
</script>
