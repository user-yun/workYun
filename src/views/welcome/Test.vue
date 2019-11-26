<template>
  <el-form label-width="30%">
    <el-form-item>{{formData.appid}}</el-form-item>
    <el-form-item>{{formData.sign}}</el-form-item>
    <el-form-item>{{formData.biz_data}}</el-form-item>
    <el-form-item>{{formData.sign_type}}</el-form-item>
    <el-form-item>{{formData.nonce}}</el-form-item>
    <el-form-item>{{formData.timestamp}}</el-form-item>
    <el-form-item>
      <a :href="location">{{location}}</a>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "Test",
  data() {
    return {
      formData: {},
      location: ""
    };
  },
  methods: {
    test() {
      window.location = this.location;
    },
    getRequest() {
      this.post(`/abcinterface/h5OpenAccount`, {}).then(res => {
        let data = res.data;
        let formData = data;
        this.location = `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?appid=${
          formData.appid
        }&sign=${formData.sign}&nonce=${formData.nonce}&biz_data=${
          formData.biz_data
        }&sign_type=${formData.sign_type}&timestamp=${
          formData.timestamp
        }&encrypt_data=${""}&encrypt_type=${""}`;
      });
    }
  },
  mounted() {
    this.getRequest();
  }
};
</script>