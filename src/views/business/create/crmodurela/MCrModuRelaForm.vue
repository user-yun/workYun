<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    inline-message
    status-icon
    label-width="30%"
  >
    <el-form-item :label="language.currentOptions" prop="Zongid">
      <span v-show="ruleForm.Zongid">
        {{ruleForm.Zongid}}
        <br />
        {{ruleForm.Title}}
      </span>
    </el-form-item>
    <el-form-item :label="language.currentOptions" prop="Pid">
      <span v-show="ruleForm.Pid">
        {{ruleForm.Pid}}
        <br />
        {{ruleForm.Pcode}}
        <br />
        {{ruleForm.Devid}}
      </span>
    </el-form-item>
    <el-form-item :label="language.equDataSampType" prop="Type">
      <el-select v-model="ruleForm.Type">
        <el-option
          v-for="(item,index) in otherInfo.equipmentList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.deviceState" prop="Status">
      <el-select v-model="ruleForm.Status">
        <el-option
          v-for="(item,index) in otherInfo.lineList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{language.sure}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "MCrModuRelaForm",
  data() {
    return {
      ruleForm: {
        Zongid: "",
        Pid: 0,
        Pcode: 1,
        Title: "",
        Type: 64,
        Status: 1,
        Devid: ""
      }
    };
  },
  components: {},
  props: {
    treeData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    rules() {
      let unselected = this.language.unselected;
      let uninput = this.language.uninput;
      let obj = {
        Zongid: [
          { required: true, message: unselected, trigger: ["blur", "change"] }
        ],
        Pid: [
          { required: true, message: unselected, trigger: ["blur", "change"] }
        ],
        Type: [
          { required: true, message: unselected, trigger: ["blur", "change"] }
        ],
        Status: [
          { required: true, message: unselected, trigger: ["blur", "change"] }
        ]
      };
      return obj;
    }
  },
  watch: {
    treeData: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        if (this.ihTrue(newv)) {
          this.$set(this.ruleForm, "Zongid", newv.Zongid);
          // this.$set(this.ruleForm, "Title", newv.Zongtitle);
          // this.$set(this.ruleForm, "Title", newv.Orgtitle);
          this.$set(this.ruleForm, "Title", newv.Ptitle);
          this.$set(this.ruleForm, "Pid", newv.Pid);
          this.$set(this.ruleForm, "Pcode", newv.Pcode);
          this.$set(this.ruleForm, "Type", newv.Type);
          this.$set(this.ruleForm, "Devid", newv.Devid);
          if (this.ihTrue(newv.Status))
            this.$set(this.ruleForm, "Status", newv.Status.online);
        }
      }
    },
    ruleForm: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        if (this.ihTrue(newv)) this.$refs["ruleForm"].validate(valid => {});
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("ruleForm", this.ruleForm);
        }
      });
    }
  },
  mounted() {
    //渲染
  }
};
</script>
