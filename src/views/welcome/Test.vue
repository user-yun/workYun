<template>
  <a :href="location">{{location}}</a>
</template>

<script>
import { formData, jsonToParams, getQueryObject, getParams } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "Test",
  data() {
    return {
      location: ""
    };
  },
  methods: {
    test() {
      window.location = encodeURI(this.location);
    },
    getRequest() {
      this.post(`/abcinterface/h5OpenAccount`, {}).then(res => {
        // let fd = formData(res.data);
        // let div = document.createElement("div");
        // div.id = "formDiv";
        // div.innerHTML = fd;
        // document.body.appendChild(div);
        // document
        //   .getElementById("formDiv")
        //   .getElementsByTagName("form")[0]
        //   .submit();
        this.$log(getParams());
        this.$log(getQueryObject());
        this.$log(
          getParams(
            `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
              res.data
            )}`
          )
        );
        this.$log(
          getQueryObject(
            `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
              res.data
            )}`
          )
        );
        this.location = `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
          res.data
        )}`;
      });
    }
  },
  mounted() {
    this.getRequest();
  }
};
</script>