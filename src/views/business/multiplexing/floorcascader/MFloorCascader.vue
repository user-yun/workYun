<template>
  <el-cascader
    :options="zoneTree"
    filterable
    :props="{ multiple: true ,expandTrigger:'hover'}"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MFloorCascader",
  data() {
    return {
      zoneTree: []
    };
  },
  methods: {
    handleChange(d) {
      this.$emit("MFloorCascader", d);
    },
    handlerData(l) {
      let that = this;
      l.forEach(e => {
        if (e.Children != null && e.Children.length > 0) {
          that.$set(e, "children", that.handlerData(e.Children));
        } else {
          that.$set(e, "children", e.Children);
        }
        that.$set(e, "label", e.Title);
        that.$set(e, "value", {
          title: e.Title,
          zoneid: e.Id,
          address: e.Address,
          district: e.District,
          area: e.Area
        });
      });
      return l;
    },
    getRequest() {
      let that = this;
      this.zoneTree = [];
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.zoneTree = that.handlerData(data);
      });
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

