<template>
  <div>{{language.quickFeedback}}</div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "quickFeedback",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
    };
  },
  methods: {
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
    },
    Intercept(arr, i, l) {
      let t = "";
      let ll = i + l;
      for (i; i < ll; i++) {
        t = t + arr[i];
      }
      return t;
    }
  },
  mounted() {
    let list = ["a", "b", "c", "d", "e", "f", "c", "d", "e", "f"];
    console.log(this.Intercept(list, 2, 5));
  }
};
</script>