<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input v-model="filterText" clearable :maxlength="20"></el-input>
      </el-col>
      <el-col :span="4">
        <i
          class="el-icon-refresh-left icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="getRequest"
        ></i>
      </el-col>
    </el-row>
    <el-tree
      ref="zoneTree"
      :data="zoneTree"
      :props="zoneTreeProps"
      node-key="/zone/tree/"
      highlight-current
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="zoneTreeNodeClick"
    >
      <span slot-scope="{ data }" class="normal">{{data.Title}}</span>
    </el-tree>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MFloorTree",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      zoneTree: [],
      zoneTreeProps: {
        children: "Children",
        label: "Title"
      },
      filterText: ""
    };
  },
  watch: {
    //监听数据变化
    filterText: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        if (this.zoneTree.length > 0) this.$refs.zoneTree.filter(newv);
      }
    }
  },
  methods: {
    getRequest() {
      this.zoneTree = [];
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.zoneTree = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Title.includes(value);
    },
    zoneTreeNodeClick(data) {
      this.$emit("MFloorTree", data);
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

