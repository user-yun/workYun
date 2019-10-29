<template>
  <el-row>
    <mt>{{language.publicBoothConfig}}</mt>
    <el-col :sm="24" :md="12" :xl="6" class="alnlft">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        inline-message
        status-icon
        label-width="30%"
      >
        <el-form-item :label="language.shareMethod" prop="shareType">
          <el-select v-model="ruleForm.shareType">
            <el-option
              v-for="(item,index) in otherInfo.shareModelList"
              :key="item.value+index"
              :value="item.value"
              :label="language[item.label]"
            >
              {{language[item.label]}}:
              <span
                v-for="(text,texti) in item.text"
                :key="texti+item.text.length"
              >{{language[text]}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.sumMeter" prop="father">
          <el-select v-model="ruleForm.father">
            <el-option
              v-for="(item,index) in List"
              :key="item.Pid+index"
              :value="item.Pid"
              :label="item.Title"
            >
              {{item.Title}}
              pid:{{item.Pid}}
              pcode:{{item.Pcode}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.boothMeter" prop="arr">
          <!-- <el-select v-model="ruleForm.arr" multiple :disabled="ruleForm.son.length>0"> -->
          <el-select v-model="ruleForm.arr" multiple value-key="id">
            <el-option
              v-for="(item,index) in List"
              :key="item.Pcode+index"
              :value="{id:item.Pid,title:item.Title,value:0.01}"
              :label="item.Title"
            >
              {{item.Title}}
              pid:{{item.Pid}}
              pcode:{{item.Pcode}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.sonMeter" prop="son">
          <!-- <el-select v-model="ruleForm.son" multiple :disabled="ruleForm.arr.length>0"> -->
          <el-select v-model="ruleForm.son" multiple value-key="id">
            <el-option
              v-for="(item,index) in List"
              :key="item.Pcode+index"
              :value="{id:item.Pid,title:item.Title,value:0.01}"
              :label="item.Title"
            >
              {{item.Title}}
              pid:{{item.Pid}}
              pcode:{{item.Pcode}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.shareMethod" prop="mode">
          <el-select v-model="ruleForm.mode">
            <el-option
              v-for="(item,index) in otherInfo.computationalModelList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.proportion" prop="factors" class="alnrit">
          <span v-for="(item,iindex) in ruleForm.son" :key="iindex">
            {{item.title}}
            <el-input-number
              v-model="item.value"
              :precision="2"
              :step="0.01"
              :min="0.01"
              :max="100"
            ></el-input-number>%
            <br>
          </span>
        </el-form-item>
        <el-form-item :label="language.shareConfigName">
          <el-input v-model="ruleForm.title" clearable :maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{language.sure}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "publicBoothConfig",
  data() {
    return {
      List: [],
      ruleForm: {
        shareType: 1,
        father: "",
        son: [],
        arr: [],
        mode: 0,
        factors: null
      }
    };
  },
  mounted() {
    this.allModuleBrief();
  },
  computed: {
    ruleFormArr() {},
    rules() {
      let that = this.ruleForm;
      let unselected = this.language.unselected;
      let uninput = this.language.uninput;
      let Arrays = (rule, value, callback) => {
        if (that.son.length < 1 && that.arr.length < 1 && that.father == "") {
          callback(new Error(unselected));
        } else {
          this.$refs.ruleForm.clearValidate(["arr", "son", "factors"]);
          callback();
        }
      };
      let obj = {
        father: [
          { required: true, validator: Arrays, trigger: ["blur", "change"] }
        ],
        // factors: [
        //   { required: true, message: uninput, trigger: ["blur", "change"] }
        // ],
        // mode: [
        //   { required: true, message: unselected, trigger: ["blur", "change"] }
        // ],
        arr: [
          { required: true, validator: Arrays, trigger: ["blur", "change"] }
        ],
        son: [
          { required: true, validator: Arrays, trigger: ["blur", "change"] }
        ]
      };
      return Object.assign(
        {},
        require("@/function/formValidation.js").default,
        obj
      );
    }
    // upOkDis() {
    //   let bool = true;
    //   if (
    //     !(
    //       this.isFalse(this.father) ||
    //       (this.son.length < 1 && this.arr.length < 1)
    //     )
    //   ) {
    //     bool = false;
    //   }
    //   return bool;
    // }
  },
  watch: {
    // "ruleForm.son": {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     if (newValue.length > 0) {
    //       this.ruleForm.arr.splice(0, this.ruleForm.arr.length);
    //     }
    //   }
    // },
    // "ruleForm.arr": {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     if (newValue.length > 0) {
    //       this.ruleForm.son.splice(0, this.ruleForm.son.length);
    //     }
    //   }
    // }
    ruleForm: {
      deep: true,
      handler(newValue, oldValue) {
        if (
          newValue.son.length > 0 ||
          newValue.arr.length > 0 ||
          newValue.father != ""
        ) {
          this.$set(this.ruleForm, "factors", 0);
        } else {
          this.$set(this.ruleForm, "factors", null);
        }
      }
    }
  },
  methods: {
    allModuleBrief() {
      let userProject = this.userInfo.userProject;
      this.get(`/module/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.post("/module/apportionrela", {
            upperPid: this.ruleForm.father,
            lowerPids: this.ruleForm.son,
            ApportionPids: this.ruleForm.arr,
            sharetype: this.ruleForm.shareType,
            dividetype: this.ruleForm.mode,
            Title: this.ruleForm.title
          }).then(res => {});
        }
      });
    }
  }
};
</script>

