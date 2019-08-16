<template>
  <el-dialog
    v-if="show"
    :visible.sync="show"
    width="20%"
    :before-close="handleClose"
    destroy-on-close
  >
    <el-radio-group v-model="step" slot="title">
      <el-radio :label="96"></el-radio>
      <el-radio :label="128"></el-radio>
    </el-radio-group>
    <el-row :gutter="20">
      <el-col
        :span="24"
        v-for="(value,index) in resData"
        :key="index"
        align="left"
      >{{value.Time.substr(0,19)}}---{{value.Allpower}}</el-col>
    </el-row>
    <span slot="footer"></span>
  </el-dialog>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "MOrgHistoryDialog",
  data() {
    return {
      step: 96,
      resData: []
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
        if (nvalue != null) this.orgHistoryList();
      }
    },
    step: {
      // immediate: true,
      deep: true,
      handler: function(nvalue, ovalue) {
        if (nvalue != null) this.orgHistoryList();
      }
    }
  },
  methods: {
    orgHistoryList() {
      this.get(`/org/historylist/${this.data.Id}/4/1/${this.step}`, {}).then(
        res => {
          if (res.ErrCode == 0) {
            this.resData = res.Data;
          }
        }
      );
    },
    handleClose() {
      this.$emit("onColse", false);
    }
  }
};
</script>

