<template>
  <div>
    <el-row class="treeSearch">
      <el-col :span="20">
        <el-tooltip :content="language.searchOrg">
          <el-input v-model="filterText" clearable :maxlength="20"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <mi icon="el-icon-refresh-left" @click="getRequest" :tooltip="language.refreshOrg"></mi>
      </el-col>
    </el-row>
    <el-tree
      ref="enterTree"
      :data="enterTree"
      :props="enterTreeProps"
      node-key="/org/list/"
      highlight-current
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="enterTreeNodeClick"
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
  name: "MEnterTree",
  data() {
    return {
      enterTree: [],
      enterTreeProps: {
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
        if (this.enterTree.length > 0) this.$refs.enterTree.filter(newv);
      }
    }
  },
  methods: {
    getRequest() {
      this.enterTree = [];
      let userProject = this.userInfo.userProject;
      this.get(`/org/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.enterTree = [
          {
            Title: this.language.allOrg,
            Children: data
          }
        ];
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Title.includes(value);
    },
    enterTreeNodeClick(data, e) {
      this.$emit("MEnterTree", this.$avoid(data), e.level);
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

