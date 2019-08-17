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
        <el-button
          type="primary"
          @click="upOk"
          style="width:100%"
          :disabled="upOkDis"
        >{{language.sure}}</el-button>
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
  </div>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "faSonConfig",
  data() {
    return {
      List: [],
      father: "",
      son: [],
      arr: []
    };
  },
  mounted() {
    this.allModuleBrief();
  },
  computed: {
    upOkDis() {
      let bool = true;
      if (
        !(
          this.isFalse(this.father) ||
          (this.son.length < 1 && this.arr.length < 1)
        )
      ) {
        bool = false;
      }
      return bool;
    }
  },
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
    }
  }
};
</script>

