<template>
  <!-- <PageTable @cellDblClick="cellDblClick" @clickPage="clickPage"></PageTable> -->
  <div>
    <el-row>
      <el-col :xs="6" :sm="5" :md="4" :xl="3">
        <el-select v-model="select">
          <el-option value="get"></el-option>
          <el-option value="post"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="13" :sm="14" :md="16" :xl="18">
        <el-input v-model="input"></el-input>
      </el-col>
      <el-col :xs="5" :sm="5" :md="4" :xl="3">
        <el-button
          icon="el-icon-search"
          type="primary"
          :disabled=" input == '' "
          @click="get"
          style="width:100%"
        ></el-button>
      </el-col>
    </el-row>
    <pre class="alnlft">{{Test}}</pre>
    <!-- <MultipleTimePickers></MultipleTimePickers> -->
    <!-- <MultipleTimeCheck
        :TL="otherInfo.peakValleyList"
        :ML="timeList"
        @group="groupMultipleTimeCheck"
    ></MultipleTimeCheck>-->
    <div class="alnlft">
      <DatePicker type="1"></DatePicker>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "test",
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    // PageTable: () => import("@/assets/PageTable")
    // MultipleTimePickers: () => import("@/assets/MultipleTimePickers")
    // MultipleTimeCheck: () => import("@/assets/MultipleTimeCheck")
    DatePicker: () => import("@/assets/DatePicker")
  },
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      input: "",
      select: "get",
      Test: {},
      timeList: [
        { type: 1, value: 0, text: "0时段" },
        { type: 1, value: 1, text: "1时段" },
        { type: 1, value: 2, text: "2时段" },
        { type: 1, value: 3, text: "3时段" },
        { type: 2, value: 4, text: "4时段" },
        { type: 2, value: 5, text: "5时段" },
        { type: 2, value: 6, text: "6时段" },
        { type: 2, value: 7, text: "7时段" },
        { type: 3, value: 8, text: "8时段" },
        { type: 3, value: 9, text: "9时段" },
        { type: 3, value: 10, text: "10时段" },
        { type: 4, value: 11, text: "11时段" },
        { type: 4, value: 12, text: "12时段" }
      ]
    };
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
    groupMultipleTimeCheck(list) {
      this.timeList = list;
    },
    async get() {
      if (this.select == "get") this.Test = await this.$Get(this.input);
      else if (this.select == "post") this.Test = await this.$Post(this.input);
    },
    // cellDblClick(row, column) {},
    // clickPage(page) {},
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
