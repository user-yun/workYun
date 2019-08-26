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
      class="alnlft"
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
    <el-col :xs="6" :sm="3" :lg="2" :xl="2" class="alnrit">
      <el-tooltip effect="light">
        <el-menu slot="content" :collapse="otherInfo.menuCollapse" @select="menuSelect">
          <el-menu-item
            v-for="(item) in otherInfo.helloMenuList"
            :key="item.route"
            :index="item.route"
          >
            <!-- :key="index+otherInfo.helloMenuList.length" -->
            <i :class="item.icon"></i>
            <span slot="title" class="normal">{{language[item.title]}}</span>
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
  computed: {},
  watch: {},
  methods: {
    getInto() {
      this.$router.push({ name: "test" });
    },
    menuSelect(index, indexPath) {
      this.$router.push({ name: index });
    }
  }
};
</script>