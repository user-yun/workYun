<template>
  <div>
    <!-- <el-image v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w100 h997" fit="cover"></el-image> -->
    <img v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w100 h997" style="object-fit:cover;">
    <el-dialog :visible="true" :show-close="false" top="30vh" :width="dialogWidth">
      <el-row slot="title">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
          <h2 class="title" @dblclick="hiddRefresh">{{language.title}}</h2>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6" class="alnrit">
          <SelectLanguage></SelectLanguage>
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        status-icon
        :rules="rules"
        @keyup.enter.native="submitForm('ruleForm')"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            :maxlength="18"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            :maxlength="20"
            show-password
            prefix-icon="el-icon-tickets"
          ></el-input>
        </el-form-item>
        <el-form-item class="alncnt">
          <el-button type="primary" @click="submitForm('ruleForm')">
            <span class="emphasize">{{language.signIn}}</span>
          </el-button>
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
      ruleForm: {
        username: null,
        password: null
      }
    };
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  props: {},
  computed: {
    rules() {
      let rules = {
        username: [{ required: true, message: "username", trigger: "blur" }],
        password: [{ required: true, message: "password", trigger: "blur" }]
      };
      return rules;
    },
    dialogWidth() {
      return this.otherInfo.menuCollapse ? "50%" : "25%";
    }
  },
  watch: {},
  methods: {
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
      let config = await this.$Get("/web-config/config.json");
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
      this.post("/auth/login", {
        Username: this.ruleForm.username,
        Password: require("js-md5")(this.ruleForm.password)
      }).then(res => {
        if (res.Code == 0) {
          let data = res.Data;
          that.setUserInfo({
            userName: data.Username,
            // headerTitle: data.Nickname,
            headerTitle: that.language.subject,
            userId: data.Id,
            userToken: data.Token,
            userRole: data.Role,
            userProject: data.Project,
            projectId: that.isFalse(res.Expand) ? null : res.Expand.Id,
            cooperativePartner: that.language.ABC
          });
          setLocal("userMemory", {
            userInfo: that.userInfo,
            otherInfo: that.otherInfo,
            language: that.language
          });
          // that.$router.replace({ name: "home" });
          that.$router.replace({ name: "test" });
        }
      });
    }
  },
  created() {
    this.$setTitle("yun3");
    this.$setIco("https://cloud.tencent.com/favicon.ico");
  },
  mounted() {
    let userMemory = getLocal("userMemory");
    if (!this.isFalse(userMemory) && Object.keys(userMemory).length > 0) {
      this.setOtherInfo(userMemory.otherInfo);
    } else {
      this.setWebConfig();
    }
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
};
</script>