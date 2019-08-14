<template>
  <el-dialog v-if="show" :visible.sync="show" :before-close="handleClose" destroy-on-close>
    <span v-if="resData!=null">
      <h4>##########################################UpperModule>##########################################</h4>
      <h4
        v-for="(value,key) in resData.UpperModule != null ? resData.UpperModule : {}"
        :key="key"
      >{{key}}:{{value}}</h4>
      <h4>##########################################ApportionModules>##########################################</h4>
      <div
        v-for="(item,index) in resData.ApportionModules != null ? resData.ApportionModules : []"
        :key="index+resData.ApportionModules.length"
      >
        <h4 v-for="(value,key) in item != null ? item : {}" :key="key">{{key}}:{{value}}</h4>
        <h4>######################################------------------------------------------------------</h4>
      </div>
      <h4>##########################################BrotherModules>##########################################</h4>
      <div
        v-for="(item,index) in resData.BrotherModules != null ? resData.BrotherModules : []"
        :key="index+resData.BrotherModules.length"
      >
        <h4 v-for="(value,key) in item != null ? item : {}" :key="key">{{key}}:{{value}}</h4>
        <h4>######################################------------------------------------------------------</h4>
      </div>
      <!-- <el-divider content-position="left">LowerModules</el-divider> -->
      <h4>##########################################LowerModules>##########################################</h4>
      <div
        v-for="(item,index) in resData.LowerModules != null ? resData.LowerModules : []"
        :key="index+resData.LowerModules.length"
      >
        <h4 v-for="(value,key) in item != null ? item : {}" :key="key">{{key}}:{{value}}</h4>
        <h4>######################################------------------------------------------------------</h4>
      </div>
    </span>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "MModuleDialog",
  data() {
    return {
      resData: null
    };
  },
  mounted() {},
  computed: {},
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
        if (nvalue != null) this.rowDblclick();
      }
    }
  },
  methods: {
    rowDblclick() {
      this.get(`/module/moudulerela/${this.data.Pid}`, {}).then(res => {
        if (res.ErrCode == 0) {
          this.resData = res.Data;
        }
      });
    },
    handleClose() {
      this.$emit("onColse", false);
    }
  }
};
</script>

