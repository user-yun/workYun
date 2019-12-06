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
          <el-input v-model="housData.Title" :maxlength="30"></el-input>
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
      housData: {},
      reconfirm: true
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
      let textArr = [
        that.housData.upTitle +
          that.language.theHousLowerAdd +
          that.housData.Title,
        that.housData.upTitle + that.language.upTheHous,
        that.housData.upTitle + that.language.deleThehous
      ];
      let typeArr = ["success", "warning", "error"];
      this.$refs[f].validate(valid => {
        if (valid) {
          if (that.reconfirm) {
            that
              .$alert(textArr[i], {
                showClose: false,
                type: typeArr[i],
                showCancelButton: true,
                cancelButtonText: that.language.cancel,
                confirmButtonText: that.language.sure
              })
              .then(() => {
                if (i == 1 || i == 0) {
                  that.theHousLowerAdd(i);
                } else if (i == 2) {
                  that.deleThehous();
                }
              })
              .catch(action => {});
          } else {
            if (i == 1 || i == 0) {
              that.theHousLowerAdd(i);
            } else if (i == 2) {
              that.deleThehous();
            }
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
      let Zoneid = undefined;//可以直接声明不带=号的
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
  mounted() {}
};
</script>