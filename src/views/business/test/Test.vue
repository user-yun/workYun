<template>
  <!-- <PageTable @cellDblClick="cellDblClick" @clickPage="clickPage"></PageTable> -->
  <div id="adwadwa">
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
    <el-row v-for="(v,i) in upData" :key="i">
      <el-col :span="4">{{v.name}}</el-col>
      <el-col :span="16">
        <el-input v-model="v.value"></el-input>
      </el-col>
      <el-col :span="2">
        <i class="el-icon-close title" @click="deleUpData(i)"></i>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input v-model="inputName"></el-input>
      </el-col>
      <el-col :span="16">
        <el-input v-model="inputValue"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="inputAdd" style="width:100%">add</el-button>
      </el-col>
    </el-row>

    <pre class="alnlft">{{upDataHandler}}</pre>
    <pre class="alnlft">{{Test}}</pre>
    <!-- <MultipleTimePickers></MultipleTimePickers> -->
    <!-- <MultipleTimeCheck
        :TL="otherInfo.peakValleyList"
        :ML="timeList"
        @group="groupMultipleTimeCheck"
    ></MultipleTimeCheck>-->
    <!-- <DatePicker :type="1" @change="pickerChange"></DatePicker> -->
    <!-- <DatePickerMult :type="1" @change="pickerChange"></DatePickerMult> -->
    <!-- <ProgresS></ProgresS> -->
    <el-button @click="exc">excelTest</el-button>
    <!-- <ECharts
      style="pointerEvents:none"
      id="TreeDemo"
      height="65vh"
      :data="require('@/echartsdata/TreeChart').default(TreeChartOption,'TB')"
      @clickECharts="clickECharts"
    ></ECharts>-->
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "test",
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    // PageTable: () => import("@/assets/PageTable"),
    // MultipleTimePickers: () => import("@/assets/MultipleTimePickers"),
    // MultipleTimeCheck: () => import("@/assets/MultipleTimeCheck"),
    // DatePicker: () => import("@/assets/DatePicker"),
    // DatePickerMult: () => import("@/assets/DatePickerMult"),
    // ProgresS: () => import("@/assets/ProgresS"),
    // Title: () => import("@/assets/Title"),
    ECharts: () => import("@/assets/ECharts.vue")
  },
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      input: "",
      upData: [],
      inputName: "",
      inputValue: "",
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
      ],
      TreeChartOption: [
        [
          {
            children: [
              {
                children: [],
                name: "分摊表",
                id: 11,
                type: 1,
                color: "#00a600"
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "分摊表",
                id: 11,
                type: 1,
                color: "#00a600"
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000",
            opacity: 0
          }
        ]
      ]
    };
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = require("@/color.js");
    //     return colors[Math.ceil(Math.random() * colors.length - 1)];
    //   }
    // }
  },
  computed: {
    upDataHandler() {
      let td = {};
      let that = this;
      this.upData.forEach(e => {
        that.$set(td, "" + e.name, e.value);
      });
      return td;
    }
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
    deleUpData(i) {
      this.upData.splice(i);
    },
    inputAdd() {
      this.upData.push({
        name: this.inputName,
        value: this.inputValue
      });
    },
    exc() {
      require("@/excelformat/test.js").default(this, "封装测试", [
        { title: "测试一", content: "内容一" },
        { title: "测试二", content: "内容二" }
      ]);
    },
    pickerChange(t) {},
    groupMultipleTimeCheck(list) {
      this.timeList = list;
    },
    async get() {
      if (this.select == "get")
        this.Test = await this.$Get(this.input, this.upDataHandler);
      else if (this.select == "post")
        this.Test = await this.$Post(this.input, this.upDataHandler);
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
