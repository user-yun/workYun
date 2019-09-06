<template>
  <div style="height:100%">
    <el-col :span="20" style="height:100%">
      <ECharts
        id="PostRevenue"
        height="99.8%"
        :data="require('@/echartsdata/TreeChart').default(TreeChartOption)"
        @clickECharts="clickECharts"
      ></ECharts>
    </el-col>
    <el-col :span="4">
      <MCrDevRelaCorrForm :treeData="treeData" @ruleForm="ruleFormHandler"></MCrDevRelaCorrForm>
    </el-col>
  </div>
</template>

<script>
export default {
  // mixins: [require("@/mymixins").default],
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
        {
          children: [
            { children: [], name: "一号楼", id: 11, layer: 2, type: 1 },
            {
              children: [
                { children: [], name: "2层", id: 121, layer: 3, type: 1 },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [],
                          name: "蜂电301",
                          id: 12211,
                          layer: 5,
                          type: 1
                        },
                        {
                          children: [],
                          name: "蜂电302",
                          id: 12212,
                          layer: 5,
                          type: 1
                        },
                        {
                          children: [],
                          name: "蜂电303",
                          id: 12213,
                          layer: 5,
                          type: 1
                        }
                      ],
                      name: "蜂电",
                      id: 1221,
                      layer: 4
                    },
                    { children: [], name: "百度", id: 1222, layer: 4, type: 1 },
                    { children: [], name: "美团", id: 1223, layer: 4, type: 1 }
                  ],
                  name: "3层",
                  id: 122,
                  layer: 3,
                  type: 1
                }
              ],
              name: "二号楼",
              id: 12,
              layer: 2,
              type: 1
            }
          ],
          name: "腾飞",
          id: 1,
          layer: 1,
          type: 1
        }
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
    //监听数据变化
    // test: {
    //   deep: true,
    //   immediate: true,
    //   handler(newv, oldv) {}
    // }
  },
  methods: {
    clickECharts(p) {
      this.treeData = p.data;
    },
    ruleFormHandler(f) {
      console.log(f);
    }
  },
  mounted() {
    //渲染
  }
};
</script>