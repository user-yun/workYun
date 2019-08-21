<template>
  <el-card class="h997">
    <h1>404</h1>
    <pre align="left">{{weather}}</pre>
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
      this.weather = await this.$Get("/weather");
    }
  },
  mounted() {
    this.get();
  }
};
</script>
