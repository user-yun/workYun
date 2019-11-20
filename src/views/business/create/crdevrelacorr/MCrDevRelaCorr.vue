<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :span="16" style="height:93%">
      <ECharts
        id="TreeConfig"
        height="99.9%"
        :data="require('@/echartsdata/TreeChart').default(TreeChartOption)"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :span="6">
      <MCrDevRelaCorrForm :treeData="treeData" @ruleForm="ruleFormHandler"></MCrDevRelaCorrForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "crdevrelacorr",
  components: {
    ECharts: () => import("@/assets/ECharts.vue"),
    MCrDevRelaCorrForm: () =>
      import("#/create/crdevrelacorr/MCrDevRelaCorrForm.vue")
  },
  data() {
    return {
      treeData: {},
      TreeChartOption: [
        [
          {
            children: [
              {
                children: [],
                name: "一号楼",
                id: 11,
                type: 1
              },
              {
                children: [
                  { children: [], name: "2层", id: 121, type: 1 },
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [],
                            name: "蜂电301",
                            id: 12211,
                            type: 2
                          },
                          {
                            children: [],
                            name: "蜂电302",
                            id: 12212,
                            type: 2
                          },
                          {
                            children: [],
                            name: "蜂电303",
                            id: 12213,
                            type: 2
                          }
                        ],
                        name: "蜂电",
                        id: 1221,
                        type: 998
                      },
                      {
                        children: [
                          {
                            children: [],
                            name: "百度401",
                            id: 12221,
                            type: 2
                          },
                          {
                            children: [],
                            name: "百度401",
                            id: 12222,
                            type: 2
                          }
                        ],
                        name: "百度",
                        id: 1222,
                        type: 1
                      },
                      {
                        children: [],
                        name: "美团",
                        id: 1223,
                        type: 2
                      },
                      {
                        children: [],
                        name: "公共",
                        id: 1224,
                        type: 2
                      }
                    ],
                    name: "3层",
                    id: 122,
                    type: 1
                  }
                ],
                name: "二号楼",
                id: 12,
                type: 1
              }
            ],
            name: "腾飞",
            id: 1,
            type: 1
          }
        ]
      ]
    };
  },
  computed: {
    // test() {
    //   let data = null;
    //   return data;
    // }
  },
  watch: {
    TreeChartOption: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {}
    }
  },
  methods: {
    clickECharts(p) {
      let d = this.$avoid(p);
      this.treeData = Object.assign({}, null, d);
    },
    async ruleFormHandler(f) {
      await this.hf(this.TreeChartOption, f);
    },
    hf(array, i) {
      let that = this;
      let nl = [];
      array.forEach(e => {
        if (e.children.length > 1) {
          that.hf(e.children, i);
        }
        if (e.id == i.id) {
          let n = i.id * 10 + 1;
          e.children.push({
            name: i.name,
            type: i.type,
            children: nl,
            id: Number(n)
          });
          return;
        }
      });
    }
  },
  mounted() {
    //渲染
  }
};
</script>