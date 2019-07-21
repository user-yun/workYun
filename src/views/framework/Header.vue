<template>
  <el-row
    type="flex"
    align="middle"
    :style="{height:'5vh',backgroundColor:otherInfo.themeBackgroundColor }"
  >
    <el-col
      :xs="12"
      :sm="{span: 16, offset: 1}"
      :lg="{span: 16, offset: 2}"
      :xl="{span: 16, offset: 3}"
      align="left"
    >
      <b class="emphasize">{{userInfo.headerTitle}}</b>
    </el-col>
    <el-col :xs="6" :sm="4" :lg="3" :xl="2">
      <el-button
        type="text"
        class="normal"
        autofocus
        :style="{color:otherInfo.themeTextColor}"
        @click="getInto"
      >{{Language.getInto}}</el-button>
    </el-col>
    <el-col :xs="6" :sm="3" :lg="2" :xl="2" align="right">
      <el-tooltip effect="light">
        <el-menu slot="content" :collapse="otherInfo.menuCollapse">
          <el-menu-item
            v-for="(item,index) in menuList"
            :key="index+menuList.length"
            :index="''+index+menuList.length"
            :route="item.route"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
        <el-button
          type="text"
          icon="el-icon-user"
          class="normal"
          :style="{color:otherInfo.themeTextColor}"
        >{{userInfo.userName}}</el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>
<script>
import { setLocal } from "@/function";
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "New",
  data() {
    return {};
  },
  components: {},
  props: {},
  computed: {
    menuList() {
      let menuList = [
        {
          icon: "el-icon-menu",
          title: "导航二",
          route: ""
        },
        {
          icon: "el-icon-document",
          title: "导航三",
          route: ""
        },
        {
          icon: "el-icon-setting",
          title: "导航四",
          route: ""
        }
      ];
      return menuList;
    }
  },
  watch: {
    "otherInfo.LanguageOpt": {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.getLanguageJson();
      }
    }
  },
  methods: {
    login() {
      this.post("/auth/login", {
        Username: "1",
        Password: "c4ca4238a0b923820dcc509a6f75849b"
      }).then(res => {});
    },
    getLanguageJson() {
      this.$Get("/language/" + this.otherInfo.LanguageOpt + ".json").then(
        res => {
          this.$store.dispatch("upVuex", {
            mutations: "setLanguage",
            value: res
          });
        }
      );
    },
    getInto() {
      this.setOtherInfo({
        LanguageOpt: "en-us"
      });
    }
  },
  created() {
    //创建
    this.setUserInfo({ userName: "yun", headerTitle: "溏心" });
    this.login();
  },
  mounted() {
    //渲染
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
