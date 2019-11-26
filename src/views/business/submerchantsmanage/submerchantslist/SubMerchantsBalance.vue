<template>
  <el-dialog v-if="show" :visible.sync="show" :before-close="handleClose" destroy-on-close>
    <el-form label-width="30%">
      <el-form-item :label="language.subMerchantsName">{{showData.MerchantName}}</el-form-item>
      <el-form-item :label="language.recordedtTotalAmount">
        <CountTo :start-val="0" :end-val="+showData.Balance" :duration="duration" :decimals="2"></CountTo>
      </el-form-item>
      <el-form-item>
        <span class="normal">{{language.balanceAccountTooltip}}</span>
      </el-form-item>
    </el-form>
    <!-- <pre v-if="typeof showData == 'object'">{{showData}}</pre>
    <div v-else>{{showData}}</div>-->
    <span slot="footer">
      <mdb @click="handleClose" type>{{language.cancel}}</mdb>
    </span>
  </el-dialog>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "SubMerchantsBalance",
  data() {
    return {
      duration: 1000,
      showData: {}
    };
  },
  components: {
    CountTo: () => import("vue-count-to")
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      default: null
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function(nvalue, ovalue) {
        try {
          if (nvalue) this.showData = JSON.parse(nvalue);
        } catch (error) {
          this.showData = nvalue;
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("onColse", false);
    }
  }
};
</script>

