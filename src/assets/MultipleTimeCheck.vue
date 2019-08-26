<template>
  <span>
    <el-checkbox-group v-model="iTL" @change="groupChange" :fill="colors[iTL]">
      <el-checkbox-button
        v-for="(tv,ti) in TL"
        :true-label="tv.value"
        :key="ti"
      >{{language[tv.text]}}</el-checkbox-button>
    </el-checkbox-group>
    {{ML}}
    <el-checkbox-group v-model="ML[iTL]" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="i in 24" :label="i" :key="i">{{i}}</el-checkbox>
    </el-checkbox-group>
  </span>
</template>

<script>
// import mymixins from "@/mymixins";
export default {
  // mixins: [mymixins],
  name: "MultipleTimeCheck",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      colors: ["#409EFF", "#F56C6C", "#E6A23C", "#909399", "#67C23A"],
      iTL: 1
    };
  },
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    //test: () => import('@/test/test.vue')
  },
  props: {
    ML: {
      type: Array,
      default: () => {
        let ML = {
          1: [],
          2: [],
          3: [],
          4: []
        };
        return ML;
      }
    },
    TL: {
      type: Array,
      default: () => {
        let TL = [
          {
            text: ["tip"],
            value: 1
          },
          {
            text: ["peak"],
            value: 2
          },
          {
            text: ["flat"],
            value: 3
          },
          {
            text: ["valley"],
            value: 4
          }
        ];
        return TL;
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
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
    groupChange(v) {
      console.log(v);
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/tree/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let projectId = this.userInfo.projectId;
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
