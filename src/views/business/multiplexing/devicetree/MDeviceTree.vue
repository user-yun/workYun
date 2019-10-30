<template>
  <div>
    <el-row class="treeSearch">
      <el-col :span="20">
        <el-tooltip :content="language.searchDev">
          <el-input v-model="filterText" clearable :maxlength="20"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-tooltip :content="language.refreshDev">
          <i class="el-icon-refresh-left icon" @click="getRequest"></i>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-tree
      ref="deviceTree"
      :data="deviceTree"
      :props="deviceTreeProps"
      node-key="/zone/allmodulebrief/"
      highlight-current
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="deviceTreeNodeClick"
      class="treeMH"
    >
      <span slot-scope="{ data }" class="emphasize">
        {{data.Orgtitle}}
        {{data.Title}}
        {{data.Pcode}}
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MDeviceTree",
  data() {
    return {
      deviceTree: [],
      deviceTreeProps: {
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
        if (this.deviceTree.length > 0) this.$refs.deviceTree.filter(newv);
      }
    }
  },
  methods: {
    getRequest() {
      this.deviceTree = [];
      let projectId = this.userInfo.projectId;
      this.get(`/zone/allmodulebrief/${projectId}`, {}).then(res => {
        let data = res.Data;
        this.deviceTree = [
          {
            Title: this.language.allDevice,
            Children: data
          }
        ];
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Title.includes(value);
    },
    deviceTreeNodeClick(data, e) {
      this.$emit("MDeviceTree", data, Object.assign({}, e.level));
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

