<template>
  <el-row>
    <el-col v-if="!proid" :span="4">
      <span v-if="showText&&!proid" class="emphasize">{{language.selectPark}}：</span>
    </el-col>
    <el-col v-if="!proid" :span="8">
      <el-select v-model="projectId" filterable clearable @change="proOrgSelect">
        <el-option
          v-for="item in projectList"
          :key="item.Project"
          :label="item.ProjectTitle"
          :value="item.Project"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <span v-if="showText" class="emphasize">{{language.selectOrg}}：</span>
    </el-col>
    <el-col :span="8">
      <el-select v-model="orgid" filterable clearable @change="proOrgSelect">
        <el-option
          v-for="item in orgList"
          :key="item.Orgid"
          :label="item.OrgTitle"
          :value="item.Orgid"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "ProOrgSearch",
  data() {
    return {
      projectList: [],
      projectId: "",
      orgList: [],
      orgid: ""
    };
  },
  props: {
    proid: {
      type: String,
      default: ""
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    projectId: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        if (newv) {
          this.getOrg();
        } else {
          this.orgList = [];
          this.orgid = "";
        }
      }
    }
  },
  methods: {
    getProject() {
      this.get(`/wxbase/allproject`, {}).then(res => {
        this.projectList = res.Data;
      });
    },
    getOrg() {
      this.orgid = "";
      this.get(`/wxbase/allorg/${this.projectId}`, {}).then(res => {
        this.orgList = res.Data;
      });
    },
    proOrgSelect() {
      if (!this.projectId) {
        this.orgid = "";
      }
      this.$emit("proOrg", {
        userProject: this.projectId,
        orgid: this.orgid
      });
    }
  },
  mounted() {
    if (this.proid) {
      this.projectId = this.proid;
    } else {
      this.getProject();
    }
  }
};
</script>