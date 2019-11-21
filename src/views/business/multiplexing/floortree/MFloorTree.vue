<template>
  <div>
    <el-row class="treeSearch">
      <el-col :span="20">
        <el-tooltip :content="language.searchHou">
          <el-input v-model="filterText" clearable :maxlength="20"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <mi icon="el-icon-refresh-left icon" @click="getRequest" :tooltip="language.refreshHou"></mi>
      </el-col>
    </el-row>
    <el-tree
      ref="zoneTree"
      :data="zoneTree"
      :props="zoneTreeProps"
      node-key="/zone/tree/"
      highlight-current
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="zoneTreeNodeClick"
      class="treeMH"
    >
      <span slot-scope="{ data }" class="emphasize">{{data.Title}}</span>
    </el-tree>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MFloorTree",
  data() {
    return {
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
    zoneTreeNodeClick(data, e) {
      this.$emit("MFloorTree", this.$avoid(data), e.level);
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

