<template>
  <div align="center">
    <el-row style="margin: 2vh 10vw ;width:80%">
      <el-col :span="6" style="font-size:20px">
        <el-select v-model="father">
          <el-option v-for="(item,index) in List" :key="item.Pid+index" :value="item.Pid">
            {{item.Param.zone}}
            {{item.Param.org}}
            {{item.Title}}
            pid:{{item.Pid}}
            pcode:{{item.Pcode}}
          </el-option>
        </el-select>
        <br />
        {{father}}
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="upOk" style="width:100%">{{language.sure}}</el-button>
      </el-col>
      <el-col :span="6" style="font-size:20px">
        <el-select v-model="son" multiple :disabled="arr.length>0">
          <el-option v-for="(item,index) in List" :key="item.Pcode+index" :value="item.Pid">
            {{item.Param.zone}}
            {{item.Param.org}}
            {{item.Title}}
            pid:{{item.Pid}}
            pcode:{{item.Pcode}}
          </el-option>
        </el-select>
        <br />
        {{son}}
      </el-col>
      <el-col :span="6" style="font-size:20px">
        <el-select v-model="arr" multiple :disabled="son.length>0">
          <el-option v-for="(item,index) in List" :key="item.Pcode+index" :value="item.Pid">
            {{item.Param.zone}}
            {{item.Param.org}}
            {{item.Title}}
            pid:{{item.Pid}}
            pcode:{{item.Pcode}}
          </el-option>
        </el-select>
        <br />
        {{arr}}
      </el-col>
    </el-row>
    <el-row style="margin: 2vh 10vw ;width:80%">
      <el-col :span="10">
        <el-input v-model="RobotToken" placeholder="RobotToken"></el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model="GroupNumber" placeholder="GroupNumber"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="Bind" style="width:100%">{{language.sure}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "config",
  data() {
    return {
      father: "",
      List: [],
      son: [],
      arr: [],
      GroupNumber: "",
      RobotToken: ""
    };
  },
  mounted() {
    this.allModuleBrief();
  },
  computed: {},
  watch: {
    son: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.length > 0) {
          this.arr.splice(0, this.arr.length);
        }
      }
    },
    arr: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.length > 0) {
          this.son.splice(0, this.son.length);
        }
      }
    }
  },
  methods: {
    allModuleBrief() {
      let projectId = this.userInfo.projectId;
      this.get(`/zone/allModuleBrief/${projectId}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    upOk() {
      this.post("/module/apportionrela", {
        upperPid: this.father,
        lowerPids: this.son,
        ApportionPids: this.arr
      }).then(res => {
        if (res.ErrCode == 0) {
          this.$message("ok");
        } else {
          this.$message(res.ErrMsg);
        }
      });
    },
    Bind() {
      let userProject = this.userInfo.userProject;
      this.post(
        `/robotBind/robotbind/${this.RobotToken}/${this.GroupNumber}/${userProject}`,
        {}
      ).then(res => {
        if (res.ErrCode == 0) {
          this.$message("ok");
        } else {
          this.$message(res.ErrMsg);
        }
      });
    }
  }
};
</script>

