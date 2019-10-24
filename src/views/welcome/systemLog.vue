<template>
  <el-timeline class="alnlft" style="width:40%;margin:5vw;">
    <el-timeline-item
      v-for="(item, index) in systemLog"
      :key="index"
      :timestamp="item.time"
      color="#000"
      placement="top"
      size="large"
    >
      <el-card :body-style="{ padding: '0.5vw 1.5vw'}">
        <p>{{item.zContent}}</p>
        <p>{{item.eContent}}</p>
        <p>{{item.oContent}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: "systemLog",
  data() {
    return {
      systemLog: []
    };
  },
  methods: {
    async req() {
      this.systemLog = await this.$Get("/web-config/systemLog.json");
      console.log(this.systemLog);
    }
  },
  mounted() {
    this.req();
  }
};
</script>
