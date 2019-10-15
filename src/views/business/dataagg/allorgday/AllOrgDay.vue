<template>
  <div>
    <DatePickerMult @change="pickerChange"></DatePickerMult>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "allOrgDay",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
    };
  },
  components: {
    DatePickerMult: () => import("@/assets/DatePickerMult")
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
    pickerChange(t) {
      this.log(t);
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
  mounted() {
    //渲染
  }
};
</script>