<template>
  <div class="mainTag">
    <!-- <el-image v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w100 h997" fit="cover"></el-image> -->
    <img v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w999 h997" style="object-fit:cover;">
    <el-dialog
      :visible="parkList.length>0"
      :show-close="false"
      top="30vh"
      :width="dialogWidth"
      custom-class="transparent02"
    >
      <el-row slot="title">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="color:#eee">
          <div class="largeTitle alncnt" @dblclick="hiddRefresh">{{language[otherInfo.helloTitle]}}</div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6" class="alnrit" v-show="false">
          <SelectLanguage></SelectLanguage>
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        status-icon
        @validate="ruleFormValidate"
        style="margin:0vw 4vh"
        @keyup.enter.native="submitForm('ruleForm')"
      >
        <el-form-item prop="parkSelectItem" :rules="rules.object">
          <el-autocomplete
            style="width:100%"
            v-model="ruleForm.parkSearchText"
            :trigger-on-focus="false"
            :fetch-suggestions="parkQuerySearchAsync"
            :placeholder="language.pleaseSearchPark"
            @select="parkQuerySearchSelect"
            :maxlength="18"
            prefix-icon="iconfont icon-fangyuanshitu"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item prop="orgSelectItem" :rules="rules.object">
          <el-autocomplete
            style="width:100%"
            v-model="ruleForm.orgSearchText"
            :trigger-on-focus="false"
            :fetch-suggestions="orgQuerySearchAsync"
            :placeholder="language.pleaseSearchOrg"
            @select="orgQuerySearchSelect"
            :maxlength="18"
            prefix-icon="iconfont icon-qiye1"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item prop="phone" :rules="rules.tel">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            :maxlength="11"
            :placeholder="language.phone"
            prefix-icon="el-icon-phone-outline"
          ></el-input>
        </el-form-item>
        <el-form-item prop="vCode" :rules="rules.input">
          <el-row>
            <el-col :span="12">
              <el-input
                type="text"
                :size="size"
                v-model="ruleForm.vCode"
                :maxlength="6"
                :placeholder="language.vCode"
                prefix-icon="el-icon-chat-dot-round"
              ></el-input>
            </el-col>
            <el-col :span="12" class="alnrit">
              <mdb ref="getVCodeButton" type @click="getVCodeFun">{{language.getVCode}}</mdb>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item prop="password" :rules="rules.password">
          <el-input
            type="password"
            :size="size"
            v-model="ruleForm.password"
            :placeholder="language.passWord"
            :maxlength="20"
            show-password
            prefix-icon="el-icon-tickets"
          ></el-input>
        </el-form-item>-->
        <el-form-item class="alncnt">
          <mdb :size="size" type="primary" @click="submitForm('ruleForm')" :long="true">
            {{language.signIn}}
            <!-- <span class="emphasize"></span> -->
          </mdb>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { setLocal, getLocal, clearLocal } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "login",
  data() {
    return {
      ruleForm: {},
      parkList: [],
      orgList: [],
      size:""
    };
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  props: {},
  computed: {
    rules() {
      let rules = {
        username: [
          { required: true, message: this.language.userName, trigger: "blur" }
        ],
        password: [
          { required: true, message: this.language.passWord, trigger: "blur" }
        ]
      };

      return Object.assign(
        {},
        require("@/function/formValidation.js").default,
        rules
      );
    },
    dialogWidth() {
      return this.otherInfo.menuCollapse ? "50%" : "25%";
    }
  },
  watch: {},
  methods: {
    ruleFormValidate(prop, is, mess) {
      let that = this;
      if (prop == "phone" && is == true && !that.ruleForm.vCodeBt) {
        that.$set(that.ruleForm, "vCodeBt", true);
        that.$refs.getVCodeButton.clickDis();
        that
          .get(`/wxbase/verification/${that.ruleForm.phone}`, {})
          .then(res => {
            that.$set(that.ruleForm, "vCode", res.Data);
          });
      }
    },
    getVCodeFun() {
      let that = this;
      that.$set(that.ruleForm, "vCodeBt", false);
      that.$refs.ruleForm.validateField("phone");
    },
    clearSelect() {
      let that = this;
      this.$set(that.ruleForm, "parkSelectItem", undefined);
      this.$set(that.ruleForm, "orgSearchText", "");
      this.orgList = [];
      this.$set(that.ruleForm, "orgSelectItem", undefined);
    },
    parkQuerySearchAsync(q, cb) {
      let that = this;
      that.clearSelect();
      let options = [];
      if (!!q) {
        that.parkList.forEach((e, i) => {
          if (e.ProjectTitle.includes(q)) {
            options.push({ ...e, value: e.ProjectTitle });
          }
        });
      }
      cb(options);
    },
    orgQuerySearchAsync(q, cb) {
      let that = this;
      let options = [];
      if (!!q) {
        that.orgList.forEach((e, i) => {
          if (e.OrgTitle.includes(q)) {
            options.push({ ...e, value: e.OrgTitle });
          }
        });
      }
      cb(options);
    },
    parkQuerySearchSelect(item) {
      let that = this;
      that.$set(that.ruleForm, "parkSelectItem", item);
      that.get(`/wxbase/allorg/${item.Project}`, {}).then(res => {
        that.orgList = res.Data;
      });
    },
    orgQuerySearchSelect(item) {
      this.$set(this.ruleForm, "orgSelectItem", item);
    },
    getAllProject() {
      let that = this;
      this.get("/wxbase/allproject", {}).then(res => {
        that.parkList = res.Data;
      });
    },
    hiddRefresh() {
      clearLocal();
      history.go(0);
    },
    resizeHandler() {
      let clientWidth = document.body.clientWidth;
      if (clientWidth <= 992) {
        this.setOtherInfo({ menuCollapse: true });
      } else {
        this.setOtherInfo({ menuCollapse: false });
      }
    },
    async setWebConfig() {
      let config = await this.$Get("/web-config/config-org.json");
      this.setOtherInfo(config);
      this.resizeHandler();
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.login();
        }
      });
    },
    login() {
      let that = this;
      this.post("/auth/orglogin", {
        Orgid: that.ruleForm.orgSelectItem.Orgid,
        Userid: that.ruleForm.phone,
        Project: that.ruleForm.parkSelectItem.Project,
        Vcode: that.ruleForm.vCode
        // Password: require("js-md5")(this.ruleForm.password)
      }).then(res => {
        if (res.Code == 0) {
          let data = res.Data;
          that.setUserInfo({
            userName: data.Orgtitle, //登录名
            // headerTitle: data.Nickname, //所属名
            // headerTitle: data.Orgtitle, //所属名
            headerTitle: data.Projecttitle + "   " + data.Address, //所属名
            // userId: data.Id, //用户id 可以没有
            userToken: data.Token,
            userRole: data.Role,
            userOrgid: data.Orgid,
            userProject: data.Project //请求project
            // projectId: that.$isTrue(res.Expand) ? res.Expand.Id : null //最高层zoneid
          });
          that.$router.replace({ name: "monthlyCheckoutSheet" });
        }
      });
    }
  },
  mounted() {
    let userMemory = getLocal("userMemory");
    this.ruleForm = getLocal("loginForm");
    // if (this.$isTrue(userMemory)) {
    if (false) {
      this.setOtherInfo(userMemory.otherInfo);
    } else {
      this.setWebConfig();
    }
    this.getAllProject();
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resizeHandler);
    setLocal("userMemory", {
      userInfo: that.userInfo,
      otherInfo: that.otherInfo,
      language: that.language
    });
    setLocal("loginForm", that.ruleForm);
  }
};
</script>