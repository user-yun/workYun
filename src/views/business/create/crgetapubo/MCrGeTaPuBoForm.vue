<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    inline-message
    status-icon
    label-width="30%"
  >
    <el-form-item :label="language.currentOptions" prop="title">
      <span v-show="ruleForm.title">{{ruleForm.title}}:{{ruleForm.zoneid}}</span>
    </el-form-item>
    <el-form-item :label="language.computingMethod" prop="preiod">
      <el-select v-model="ruleForm.preiod">
        <el-option
          v-for="(item,index) in periodList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.shareMethod" prop="mode">
      <el-select v-model="ruleForm.mode">
        <el-option
          v-for="(item,index) in modeList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.equDataSampType" prop="outputduty">
      <el-select v-model="ruleForm.outputduty">
        <el-option
          v-for="(item,index) in outputdutyList"
          :key="index+item.value"
          :value="item.value"
          :label="language[item.text]"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="language.undetermined" prop="code">
      <el-input-number v-model="ruleForm.code" :precision="2" :step="1" :min="1" :max="99"></el-input-number>
    </el-form-item>
    <el-form-item :label="language.undetermined" prop="sourcecode">
      <el-input-number v-model="ruleForm.sourcecode" :precision="2" :step="1" :min="1" :max="99"></el-input-number>
    </el-form-item>
    <el-form-item :label="language.undetermined" prop="outputcode">
      <el-input-number v-model="ruleForm.outputcode" :precision="2" :step="1" :min="1" :max="99"></el-input-number>
    </el-form-item>
    <el-form-item :label="language.proportion" prop="factors">
      <el-input-number v-model="ruleForm.factors" :precision="2" :step="0.1" :min="0.1" :max="99"></el-input-number>
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
  name: "MCrGeTaPuBoForm",
  data() {
    return {
      periodList: [
        {
          text: "realTime", //实时
          value: 0
        },
        {
          text: "day", //天
          value: 96
        },
        {
          text: "month", //月
          value: 128
        }
      ],
      modeList: [
        {
          text: "equipartition", //均分
          value: 0
        },
        {
          text: "proportion", //比例
          value: 1
        },
        {
          text: "area", //面积
          value: 2
        },
        {
          text: "electricity", //电量
          value: 3
        }
      ],
      outputdutyList: [
        {
          text: "wattHourMeter", //电表
          value: 4
        },
        {
          text: "peakValleyMeter", //峰谷表
          value: 8
        }
      ],
      ruleForm: {
        zoneid: "",
        title: "",
        preiod: 0, //计算方式
        code: 1,
        sourcecode: 1,
        mode: 1, //分摊方式
        outputduty: 4, //设备数据采样类型
        outputcode: 1,
        factors: 0.2 //比例信息
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
        title: [{ required: true, message: unselected, trigger: "blur" }],
        preiod: [{ required: true, message: unselected, trigger: "blur" }],
        mode: [{ required: true, message: unselected, trigger: "blur" }],
        outputduty: [{ required: true, message: unselected, trigger: "blur" }],
        code: [{ required: true, message: uninput, trigger: "blur" }],
        sourcecode: [{ required: true, message: uninput, trigger: "blur" }],
        outputcode: [{ required: true, message: uninput, trigger: "blur" }],
        factors: [{ required: true, message: uninput, trigger: "blur" }]
      };
      return obj;
    }
  },
  watch: {
    treeData: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        if (!this.isFalse(newv)) {
          this.$set(this.ruleForm, "zoneid", newv.Id);
          this.$set(this.ruleForm, "title", newv.Title);
        }
      }
    },
    ruleForm: {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        this.$refs["ruleForm"].validate(valid => {});
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
