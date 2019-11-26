<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <el-col :span="4">
      <MFloorTree ref="MFloorTree" @MFloorTree="MFloorTreeClick"></MFloorTree>
    </el-col>
    <el-col :span="6">
      <el-form ref="form" :model="housData" label-width="40%">
        <el-form-item :label="language.curOptHou">{{housData.upTitle}}</el-form-item>
        <el-form-item :label="language.housName" prop="Title" :rules="rules.input">
          <el-input v-model="housData.Title" :maxlength="12"></el-input>
        </el-form-item>
        <el-form-item :label="language.area" prop="Area" :rules="rules.numTType">
          <el-input type="number" v-model.number="housData.Area" :maxlength="5">
            <span slot="append">{{language.squareMeter}}</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <mdb
            type="primary"
            @click="submitForm('form',0)"
            :disabled="!housData.upTitle"
          >{{language.theHousLowerAdd}}</mdb>
        </el-form-item>
        <el-form-item>
          <mdb
            type="warning"
            @click="submitForm('form',1)"
            :disabled="!housData.upTitle"
          >{{language.upTheHous}}</mdb>
        </el-form-item>
        <el-form-item>
          <mdb
            type="danger"
            @click="submitForm('form',2)"
            :disabled="!housData.upTitle"
          >{{language.deleThehous}}</mdb>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "housManageMent",
  data() {
    return {
      housData: {}
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
    MFloorTree: () => import("#/multiplexing/floortree/MFloorTree.vue")
  },
  methods: {
    submitForm(f, i) {
      let that = this;
      this.$refs[f].validate(valid => {
        if (valid) {
          if (i == 1 || i == 0) {
            that.theHousLowerAdd(i);
          } else if (i == 2) {
            that.deleThehous();
          }
        }
      });
    },
    MFloorTreeClick(d) {
      this.housData = this.$avoid(d);
      this.$set(this.housData, "upTitle", this.housData.Title);
    },
    theHousLowerAdd(i) {
      let that = this;
      let Project = this.userInfo.userProject;
      let Zoneid = undefined;
      if (i == 1) {
        Zoneid = that.housData.Id;
      }
      this.post(
        "/zone/create",
        {
          Project,
          Title: "" + that.housData.Title,
          Upperid: that.housData.Id,
          Area: that.housData.Area,
          Zoneid
        },
        false,
        true
      ).then(res => {
        that.$refs.MFloorTree.getRequest();
        that.housData = {};
      });
    },
    deleThehous() {
      let that = this;
      this.post(
        "/zone/delete",
        {
          Zoneid: that.housData.Id
        },
        false,
        true
      ).then(res => {
        that.$refs.MFloorTree.getRequest();
        that.housData = {};
      });
    }
  },
  mounted() {
    //渲染
  }
};
</script>