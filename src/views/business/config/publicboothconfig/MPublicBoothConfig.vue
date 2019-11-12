<template>
  <el-row style=" width:80%">
    <mt>{{language[$options.name]}}</mt>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message label-width="30%">
      <br>
      <br>
      <!-- 配置名称 -->
      <el-form-item :label="language.programmeName">
        <el-input
          v-model="ruleForm.title"
          clearable
          :maxlength="20"
          show-word-limit
          style="width:50%"
        ></el-input>
      </el-form-item>
      <br>
      <br>
      <el-col :span="8">
        <!-- 待摊电量计算 -->
        <el-form-item>{{language.daitanElectricityCalculation}}</el-form-item>
        <!-- 电表关系 -->
        <el-form-item :label="language.meterRela">
          <el-select v-model="ruleForm.ammeterRelation">
            <el-option
              v-for="(item,index) in otherInfo.shareModelList"
              :key="item.value+index"
              :value="item.value"
              :label="language[item.label]"
            >
              <span
                style="float: left"
                v-for="(text,texti) in item.text"
                :key="texti+item.text.length"
              >{{language[text]}}</span>
              <span style="float: right; color: #eee">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 总表子表 选项为1时显示 -->
        <fragment v-if="ruleForm.ammeterRelation==1">
          <!-- 总表 -->
          <el-form-item :label="language.sumMeter">
            <el-select v-model="ruleForm.upperModule" value-key="pid">
              <el-option
                v-for="(item,index) in moduleList"
                :key="item.Pid+index"
                :value="{pid:item.Pid,title:item.Title,value:1,pcode:item.Pcode}"
                :label="item.Title"
              >
                {{item.Title}}
                pid:{{item.Pid}}
                pcode:{{item.Pcode}}
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 子表 -->
          <el-form-item :label="language.sonMeter">
            <el-select v-model="ruleForm.lowerModules" multiple value-key="pid">
              <el-option
                v-for="(item,index) in moduleList"
                :key="item.Pcode+index"
                :value="{pid:item.Pid,title:item.Title,value:1,pcode:item.Pcode}"
                :label="item.Title"
              >
                {{item.Title}}
                pid:{{item.Pid}}
                pcode:{{item.Pcode}}
              </el-option>
            </el-select>
          </el-form-item>
        </fragment>
        <!-- 待摊表 选项为2时显示 -->
        <el-form-item v-if="ruleForm.ammeterRelation==2" :label="language.boothMeter">
          <el-select v-model="ruleForm.apportionModules" multiple value-key="pid">
            <el-option
              v-for="(item,index) in moduleList"
              :key="item.Pcode+index"
              :value="{pid:item.Pid,title:item.Title,value:1,pcode:item.Pcode}"
              :label="item.Title"
            >
              {{item.Title}}
              pid:{{item.Pid}}
              pcode:{{item.Pcode}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <!-- 分配方案 -->
        <el-form-item>{{language.distributionProgramme}}</el-form-item>
        <!-- 分配对象 -->
        <el-form-item :label="language.distributionObj">
          <el-select v-model="ruleForm.apportionObject">
            <el-option
              v-for="(item,index) in otherInfo.computationalTypeList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span style="float: left">{{language[item.text]}}</span>
              <span style="float: right; color: #eee">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 分配方式 -->
        <el-form-item :label="language.distributionMethod">
          <el-select v-model="ruleForm.apportionType">
            <el-option
              v-for="(item,index) in otherInfo.computationalModelList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span style="float: left">{{language[item.text]}}</span>
              <span style="float: right; color: #eee">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 计算电量等级 分配方式为电量3时显示 -->
        <!-- <el-form-item v-if="ruleForm.apportionType==3" :label="language.proportion">
          <el-select v-model="ruleForm.elecGrade">
            <el-option
              v-for="(item,index) in otherInfo.byElecCalculatingGradeList"
              :key="index+item.value"
              :value="item.value"
              :label="language[item.text]"
            >
              <span style="float: left">{{language[item.text]}}</span>
              <span style="float: right; color: #eee">{{item.value}}</span>
            </el-option>
          </el-select>
        </el-form-item>-->
        <!-- 企业 -->
        <el-form-item v-if="ruleForm.apportionObject==1" :label="language.organization">
          <el-select v-model="ruleForm.orgs" multiple value-key="orgid">
            <el-option
              v-for="(item,index) in orgList"
              :key="index"
              :value="{orgid:item.Id,title:item.Title,value:1}"
              :label="item.Title"
            >{{item.Title}}</el-option>
          </el-select>
        </el-form-item>
        <!-- 房源 -->
        <el-form-item v-if="ruleForm.apportionObject==2" :label="language.hous">
          <MFloorCascader @MFloorCascader="MFloorCascader" style=" width:80%"></MFloorCascader>
        </el-form-item>
        <!-- 待摊子表 -->
        <el-form-item v-if="ruleForm.apportionObject==3" :label="language.sonMeter">
          <el-select v-model="ruleForm.modules" multiple value-key="pid">
            <el-option
              v-for="(item,index) in moduleList"
              :key="item.Pcode+index"
              :value="{pid:item.Pid,title:item.Title,value:1,pcode:item.Pcode}"
              :label="item.Title"
            >
              {{item.Title}}
              pid:{{item.Pid}}
              pcode:{{item.Pcode}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="alnrit">
        <el-form-item>&nbsp;</el-form-item>
        <el-form-item>&nbsp;</el-form-item>
        <el-form-item>&nbsp;</el-form-item>
        <!-- 企业 企业比例 企业权重 分配对象为企业1时显示 -->
        <fragment v-if="ruleForm.apportionObject==1">
          <!-- 企业比例 分配方式为比例1时显示 -->
          <el-form-item v-if="ruleForm.apportionType==1" :label="language.proportion">
            <div v-for="(item,iindex) in ruleForm.orgs" :key="iindex">
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="100"
                :precision="2"
                style=" width:50%"
              ></el-input-number>%
            </div>
          </el-form-item>
          <!-- 企业权重 分配方式为权重4时显示 -->
          <el-form-item v-if="ruleForm.apportionType==4" :label="language.weight">
            <div v-for="(item,iindex) in ruleForm.orgs" :key="iindex">
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="1000"
                :precision="0"
                style=" width:50%"
              ></el-input-number>
            </div>
          </el-form-item>
        </fragment>
        <!-- 房源 房源比例 房源面积权重 房源权重 分配对象为房源2时显示 -->
        <fragment v-if="ruleForm.apportionObject==2">
          <!-- 房源比例 分配方式为比例1时显示 -->
          <el-form-item v-if="ruleForm.apportionType==1" :label="language.proportion">
            <div v-for="(item,iindex) in ruleForm.zones" :key="iindex">
              <!-- {{item[item.length-1].Title}} -->
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="100"
                :precision="2"
                style=" width:50%"
              ></el-input-number>%
            </div>
          </el-form-item>
          <!-- 房源面积权重 分配方式为面积2时显示 -->
          <el-form-item v-if="ruleForm.apportionType==2" :label="language.area+language.weight">
            <div v-for="(item,iindex) in ruleForm.zones" :key="iindex">
              {{item.title}}
              <el-input-number
                disabled
                v-model.number="item.value"
                :min="0"
                :precision="2"
                style=" width:50%"
              ></el-input-number>
            </div>
          </el-form-item>
          <!-- 房源权重 分配方式为权重4时显示 -->
          <el-form-item v-if="ruleForm.apportionType==4" :label="language.weight">
            <div v-for="(item,iindex) in ruleForm.zones" :key="iindex">
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="1000"
                :precision="0"
                style=" width:50%"
              ></el-input-number>
            </div>
          </el-form-item>
        </fragment>
        <!-- 待摊子表 子表比例 子表权重 分配对象为电表3时显示 -->
        <fragment v-if="ruleForm.apportionObject==3">
          <!-- 子表比例 分配方式为比例1时显示 -->
          <el-form-item v-if="ruleForm.apportionType==1" :label="language.proportion">
            <div v-for="(item,iindex) in ruleForm.modules" :key="iindex">
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="100"
                :precision="2"
                style="width:50%"
              ></el-input-number>%
            </div>
          </el-form-item>
          <!-- 子表权重 分配方式为权重4时显示 -->
          <el-form-item v-if="ruleForm.apportionType==4" :label="language.weight">
            <div v-for="(item,iindex) in ruleForm.modules" :key="iindex">
              {{item.title}}
              <el-input-number
                v-model.number="item.value"
                :min="0"
                :max="1000"
                :precision="0"
                style="width:50%"
              ></el-input-number>
            </div>
          </el-form-item>
        </fragment>
      </el-col>
      <el-col :span="24">
        <br>
        <br>
        <br>
        <!-- <el-form-item :label="language.programmeRemarks">
          <el-input
            v-model="ruleForm.remark"
            clearable
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            show-word-limit
            :maxlength="220"
            style="width:50%"
          ></el-input>
        </el-form-item>-->
        <el-form-item>
          <mdb
            type="primary"
            style="width:50%"
            @click="submitForm('ruleForm')"
          >{{language.sure}}</mdb>
        </el-form-item>
      </el-col>
    </el-form>
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
      ruleForm: {},
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
        if (
          that.lowerModules.length < 1 &&
          that.apportionModules.length < 1 &&
          that.upperModule == ""
        ) {
          callback(new Error(unselected));
        } else {
          this.$refs.ruleForm.clearValidate([
            "apportionModules",
            "lowerModules",
            "factors"
          ]);
          callback();
        }
      };
      let obj = {
        upperModule: [
          { required: true, validator: Arrays, trigger: ["blur", "change"] }
        ],
        // factors: [
        //   { required: true, message: uninput, trigger: ["blur", "change"] }
        // ],
        // apportionType: [
        //   { required: true, message: unselected, trigger: ["blur", "change"] }
        // ],
        apportionModules: [
          { required: true, validator: Arrays, trigger: ["blur", "change"] }
        ],
        lowerModules: [
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
    //       this.isFalse(this.upperModule) ||
    //       (this.lowerModules.length < 1 && this.apportionModules.length < 1)
    //     )
    //   ) {
    //     bool = false;
    //   }
    //   return bool;
    // }
  },
  watch: {
    // "ruleForm.lowerModules": {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     if (newValue.length > 0) {
    //       this.ruleForm.apportionModules.splice(0, this.ruleForm.apportionModules.length);
    //     }
    //   }
    // },
    // "ruleForm.apportionModules": {
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     if (newValue.length > 0) {
    //       this.ruleForm.lowerModules.splice(0, this.ruleForm.lowerModules.length);
    //     }
    //   }
    // }
    "ruleForm.ammeterRelation": {
      immediate: true,
      handler(newValue, oldValue) {
        this.$set(this.ruleForm, "lowerModules", undefined);
        this.$set(this.ruleForm, "upperModule", undefined);
        this.$set(this.ruleForm, "apportionModules", undefined);
      }
    },
    "ruleForm.apportionObject": {
      immediate: true,
      handler(newValue, oldValue) {
        this.$set(this.ruleForm, "orgs", undefined);
        this.$set(this.ruleForm, "zones", undefined);
        this.$set(this.ruleForm, "modules", undefined);
      }
    },
    "ruleForm.apportionType": {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        let that = this;
        if (that.ruleForm.zones != undefined) {
          that.ruleForm.zones.forEach(e => {
            if (newValue == 2) {
              that.$set(e, "value", e.area);
            } else {
              that.$set(e, "value", e.transition);
            }
          });
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
      let l = [];
      let value = 1;
      d.forEach(e => {
        let de = e[e.length - 1];
        if (that.ruleForm.apportionType == 2) {
          that.$set(de, "value", de.area);
        } else {
          that.$set(de, "value", value);
        }
        that.$set(de, "transition", value);
        l.push(de);
      });
      this.$set(this.ruleForm, "zones", l);
    },
    allModuleBrief() {
      let userProject = this.userInfo.userProject;
      this.get(`/module/list/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.moduleList = data;
      });
    },
    submitForm(formName) {
      let that = this;
      let project = that.userInfo.userProject;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that
            .post(
              "/conf/create",
              {
                project,
                title: that.ruleForm.title,
                remark: that.ruleForm.remark,
                ammeter_relation: that.ruleForm.ammeterRelation,
                upper_module: that.ruleForm.upperModule,
                lower_modules: that.ruleForm.lowerModules,
                apportion_modules: that.ruleForm.apportionModules,
                apportion_object: that.ruleForm.apportionObject,
                apportion_type: that.ruleForm.apportionType,
                orgs: that.ruleForm.orgs,
                zones: that.ruleForm.zones,
                modules: that.ruleForm.modules
              },
              false,
              true
            )
            .then(res => {});
        }
      });
    }
  }
};
</script>