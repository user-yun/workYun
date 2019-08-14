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
        <br>
        {{father}}
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="upOk" style="width:100%">提交</el-button>
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
        <br>
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
        <br>
        {{arr}}
      </el-col>
    </el-row>
    <el-row style="margin: 2vh 10vw ;width:80%">
      <el-col :span="10">
        <el-input v-model="RobotToken" placeholder="请输入机器人Token"></el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model="GroupNumber" placeholder="请输入群号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="Bind" style="width:100%">绑定</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MConfig",
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
    this.getZone();
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
    getZone() {
      let that = this;
      let val = window.localStorage.park_FloorId;
      this.$http
        .get(`${this.$store.state.url}/zone/allmodulebrief/${val}`)
        .then(res => {
          if (res.ErrCode == 0) {
            that.List = res.Data;
          }
        });
    },
    upOk() {
      this.$http({
        method: "post",
        url: `${this.$store.state.url}/module/apportionrela`,
        data: {
          upperPid: this.father,
          lowerPids: this.son,
          ApportionPids: this.arr
        }
      }).then(res => {
        if (res.ErrCode == 0) {
          this.$message("成功");
        } else {
          this.$message(res.ErrMsg);
        }
      });
    },
    Bind() {
      this.$http({
        method: "post",
        url: `${this.$store.state.url}/robotBind/robotbind/${this.RobotToken}/${
          this.GroupNumber
        }/${window.localStorage.park_project}`,
        data: {}
      }).then(res => {
        if (res.ErrCode == 0) {
          this.$message("成功");
        } else {
          this.$message(res.ErrMsg);
        }
      });
    }
  }
};
</script>

