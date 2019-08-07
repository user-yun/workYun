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
      <b class="emphasize" :style="{color:otherInfo.themeTextColor}">{{userInfo.headerTitle}}</b>
    </el-col>
    <el-col :xs="6" :sm="4" :lg="3" :xl="2">
      <el-button
        type="text"
        class="normal"
        autofocus
        :style="{color:otherInfo.themeTextColor}"
        @click="getInto"
      >{{language.getInto}}</el-button>
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
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "helloHeader",
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
  watch: {},
  methods: {
    getInto() {
      this.$router.push({ name: "test" });
    }
  }
};
</script>