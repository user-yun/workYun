<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :span="4">
      <MEnterTree ref="MEnterTree" @MEnterTree="MEnterTreeClick"></MEnterTree>
    </el-col>
    <el-col :span="6">
      <el-form ref="form" :model="orgData" lnline inline-message status-icon label-width="40%">
        <el-form-item :label="language.curOptOrg">{{orgData.selectTitle}}</el-form-item>
        <el-form-item :label="language.enterpriseName" prop="title" :rules="rules.input">
          <el-input v-model="orgData.title" :maxlength="15"></el-input>
        </el-form-item>
        <el-form-item :label="language.contacts" prop="contact" :rules="rules.input">
          <el-input v-model="orgData.contact" :maxlength="5"></el-input>
        </el-form-item>
        <el-form-item :label="language.email" prop="email" :rules="rules.mail">
          <el-input v-model="orgData.email" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="language.tel" prop="phone" :rules="rules.tel">
          <el-input v-model="orgData.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
          <mdb type="primary" @click="submitForm('form',0)">{{language.addNewOrg}}</mdb>
        </el-form-item>
        <el-form-item>
          <mdb
            type="warning"
            @click="submitForm('form',1)"
            :disabled="!orgData.selectTitle"
          >{{language.upTheOrg}}</mdb>
        </el-form-item>
        <el-form-item>
          <mdb
            type="danger"
            @click="submitForm('form',2)"
            :disabled="!orgData.selectTitle"
          >{{language.deleTheOrg}}</mdb>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "orgManageMent",
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      orgData: {}
    };
  },
  computed: {
    rules() {
      let obj = {};
      return Object.assign(
        {},
        require("@/function/formValidation.js").default,
        obj
      );
    }
  },
  components: {
    MEnterTree: () => import("#/multiplexing/entertree/MEnterTree.vue")
  },
  methods: {
    MEnterTreeClick(t) {
      let orgData = this.$avoid(t);
      this.$set(this.orgData, "orgid", orgData.Id);
      this.$set(this.orgData, "selectTitle", orgData.Title);
      this.$set(this.orgData, "title", orgData.Title);
      this.$set(this.orgData, "phone", orgData.Param.phone);
      this.$set(this.orgData, "contact", orgData.Param.contact);
      this.$set(this.orgData, "email", orgData.Param.email);
    },
    submitForm(f, i) {
      let that = this;
      this.$refs[f].validate(valid => {
        if (valid) {
          if (i == 0) {
            that.addNewOrg();
          } else if (i == 2) {
            that.deleTheOrg();
          }
        }
      });
    },
    addNewOrg() {
      let that = this;
      let project = that.userInfo.userProject;
      this.post("/org/create", {
        project,
        ...that.orgData
      }).then(res => {
        that.$refs.MEnterTree.getRequest();
        that.orgData = {};
      });
    },
    deleTheOrg() {
      let that = this;
      let orgid = that.orgData.orgid;
      this.post("/org/delete", {
        orgid
      }).then(res => {
        that.$refs.MEnterTree.getRequest();
        that.orgData = {};
      });
    }
  }
};
</script>