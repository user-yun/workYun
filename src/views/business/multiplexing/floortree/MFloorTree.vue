<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input v-model="filterText" clearable :maxlength="20"></el-input>
      </el-col>
      <el-col :span="4">
        <i
          class="el-icon-refresh-left icon"
          :style="{color:otherInfo.themeBackgroundColor}"
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
    ></el-tree>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
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
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    //test: () => import('@/test/test.vue')
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
    //     return colors[Math.ceil(Math.random() * colors.length)];
    //   }
    // }
  },
  computed: {},
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

