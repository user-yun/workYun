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
    postRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  mounted() {}
};
</script>