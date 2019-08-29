<template>
  <el-card class="h997">
    <h1>404</h1>
    <pre class="alnlft">{{weather}}</pre>
  </el-card>
</template>

<script>
export default {
  name: "error-404",
  data() {
    return {
      weather: {}
    };
  },
  methods: {
    async get() {
      let appid = "25161667";
      let appsecret = "y5cW8f2j";
      // let cityid = "101020100";
      let city = "上海";
      this.weather = await this.$Get("/weather", { appid, appsecret, city });
    }
  },
  mounted() {
    this.get();
  }
};
</script>
