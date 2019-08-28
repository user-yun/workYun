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
      ref="enterTree"
      :data="enterTree"
      :props="enterTreeProps"
      node-key="/org/list/"
      highlight-current
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="enterTreeNodeClick"
    >
      <span slot-scope="{ data }" class="normal">
        {{data.Orgtitle}}
        {{data.Title}}
        {{data.Pcode}}
      </span>
    </el-tree>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
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
            Title: this.userInfo.headerTitle,
            Children: data
          }
        ];
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Title.includes(value);
    },
    enterTreeNodeClick(data) {
      this.$emit("MEnterTree", data);
    }
  },
  mounted() {
    //渲染
    this.getRequest();
  }
};
</script>

