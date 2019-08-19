<template>
  <PageTable @cellDblClick="cellDblClick" @clickPage="clickPage"></PageTable>
</template>

<script>
// import mymixins from "@/mymixins";
export default {
  // mixins: [mymixins],
  name: "test",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
    };
  },
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    PageTable: () => import("@/assets/PageTable.vue")
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
  computed: {
    // test() {
    //   let data = null;
    //   return data;
    // }
  },
  watch: {
    //监听数据变化
    // test: {
    //   deep: true,
    //   immediate: true,
    //   handler(newv, oldv) {}
    // }
  },
  methods: {
    cellDblClick(row, column) {
      console.log(row);
      console.log(column);
    },
    clickPage(page) {
      console.log(page);
    },
    getRequest() {
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  beforeCreate() {
    //创建前
  },
  created() {
    //创建
  },
  beforeMount() {
    //渲染前
    // this.$forceUpdate();
    // this.$nextTick();
  },
  mounted() {
    //渲染
  },
  activited() {
    //可见
  },
  beforeUpdate() {
    //更新前
  },
  updated() {
    //更新
  },
  beforeDestroy() {
    //销毁前
  },
  destroyed() {
    //销毁
  }
};
</script>
<style scoped>
.test {
}
</style>
