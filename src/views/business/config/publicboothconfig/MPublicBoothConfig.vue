<template>
  <el-row>
    <mt>{{language.publicBoothConfig}}</mt>
    <el-col :sm="24" :md="12" :xl="12">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message label-width="30%">
        <el-form-item :label="language.meterStructure" prop="shareType">
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
        <el-form-item :label="language.shareType">
          <el-select v-model="ruleForm.shareMethodType">
            <el-option
              v-for="(item,index) in otherInfo.computationalTypeList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span style="float: left">{{language[item.text]}}</span>
              <span style="float: right; color: #ccc">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.shareMethod">
          <el-select v-model="ruleForm.mode">
            <el-option
              v-for="(item,index) in otherInfo.computationalModelList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span style="float: left">{{language[item.text]}}</span>
              <span style="float: right; color: #ccc">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <fragment v-if="ruleForm.shareMethodType==1">
          <el-form-item :label="language.organization">
            <el-select v-model="ruleForm.org" multiple value-key="id">
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :value="{id:item.Id,title:item.Title,value:0.01}"
                :label="item.Title"
              >{{item.Title}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.mode==1" :label="language.proportion">
            <el-input
              v-for="(item,iindex) in ruleForm.org"
              :key="iindex"
              type="number"
              v-model.number="item.value"
              :maxlength="5"
              :min="0.00"
              :max="100.00"
              style="width:80%"
            >
              <span slot="prepend">{{item.title}}</span>
              <span slot="append">%</span>
            </el-input>
          </el-form-item>
        </fragment>
        <fragment v-if="ruleForm.shareMethodType==2">
          <el-form-item :label="language.shareHous">
            <MFloorCascader @MFloorCascader="MFloorCascader" style="width:80%"></MFloorCascader>
          </el-form-item>
          <el-form-item v-if="ruleForm.mode==1" :label="language.proportion">
            <el-input
              v-for="(item,iindex) in housList"
              :key="iindex"
              type="number"
              v-model.number="item[item.length-1].value"
              :maxlength="5"
              :min="0.00"
              :max="100.00"
              style="width:80%"
            >
              <span slot="prepend">{{item[item.length-1].Title}}</span>
              <span slot="append">%</span>
            </el-input>
          </el-form-item>
        </fragment>
        <fragment v-if="ruleForm.shareMethodType==3">
          <el-form-item :label="language.sumMeter">
            <el-select v-model="ruleForm.father">
              <el-option
                v-for="(item,index) in moduleList"
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
          <el-form-item :label="language.boothMeter">
            <!-- <el-select v-model="ruleForm.arr" multiple :disabled="ruleForm.son.length>0"> -->
            <el-select v-model="ruleForm.arr" multiple value-key="id">
              <el-option
                v-for="(item,index) in moduleList"
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
          <el-form-item :label="language.sonMeter">
            <!-- <el-select v-model="ruleForm.son" multiple :disabled="ruleForm.arr.length>0"> -->
            <el-select v-model="ruleForm.son" multiple value-key="id">
              <el-option
                v-for="(item,index) in moduleList"
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
          <el-form-item v-if="ruleForm.mode==1" :label="language.proportion">
            <el-input
              v-for="(item,iindex) in ruleForm.son"
              :key="iindex"
              type="number"
              v-model.number="item.value"
              :maxlength="5"
              :min="0.00"
              :max="100.00"
              style="width:80%"
            >
              <span slot="prepend">{{item.title}}</span>
              <span slot="append">%</span>
            </el-input>
          </el-form-item>
        </fragment>

        <el-form-item :label="language.shareConfigName">
          <el-input
            v-model="ruleForm.title"
            clearable
            :maxlength="10"
            show-word-limit
            style="width:80%"
          ></el-input>
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
  components: {
    MFloorCascader: () => import("#/multiplexing/floorcascader/MFloorCascader")
  },
  data() {
    return {
      moduleList: [],
      ruleForm: {
        shareType: 1,
        father: "",
        son: [],
        arr: [],
        mode: 0,
        shareMethodType: 1,
        factors: null
      },
      housList: [],
      orgList: []
    };
  },
  mounted() {
    this.allModuleBrief();
    this.getRequest();
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
    getRequest() {
      let userProject = this.userInfo.userProject;
      this.get(`/org/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.orgList = data;
      });
    },
    MFloorCascader(d) {
      let that = this;
      d.forEach(e => {
        that.$set(e[e.length - 1], "value", 0.01);
      });
      this.housList = d;
    },
    allModuleBrief() {
      let userProject = this.userInfo.userProject;
      this.get(`/module/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.moduleList = data;
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

