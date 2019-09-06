<template>
  <el-drawer
    :size=" otherInfo.menuCollapse ? '75%' : '35%' "
    :visible="otherInfo.drawerVisible"
    :direction="otherInfo.drawerDirection"
    :modal="true"
    :show-close="true"
    :append-to-body="false"
    :close-on-press-escape="false"
    :before-close="closeDrawer"
    :destroy-on-close="true"
  >
    <el-form label-width="30%">
      <el-form-item class="alnlft">
        <span slot="label" class="normal">{{language.themeBackgroundColor}}</span>
        <el-color-picker v-model="themeBackgroundColor" :disabled="configThemeDisabled"></el-color-picker>
      </el-form-item>
      <el-form-item class="alnlft">
        <span slot="label" class="normal">{{language.themeTextColor}}</span>
        <el-color-picker v-model="themeTextColor" :disabled="configThemeDisabled"></el-color-picker>
      </el-form-item>
      <el-form-item class="alnlft">
        <span slot="label" class="normal">{{language.presetTheme}}</span>
        <el-col :span="2" v-for="(item,index) in otherInfo.themePresetList" :key="index">
          <span
            :style="{background:`linear-gradient(135deg,
          ${item.themeBackgroundColor} 0%,
          ${item.themeBackgroundColor} 50%,
          ${item.themeTextColor} 51%,
          ${item.themeTextColor} 100%)`}"
            class="themeSpan"
            @click="clickThemePreset(item)"
          ></span>
        </el-col>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "drawer",
  data() {
    return {};
  },
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    //test: () => import('@/test/test.vue')
  },
  computed: {
    configThemeDisabled() {
      let d = this.otherInfo.configThemeDisabled;
      return d;
    },
    themeBackgroundColor: {
      get() {
        let c = this.otherInfo.themeBackgroundColor;
        return c;
      },
      set(v) {
        this.setOtherInfo({ themeBackgroundColor: v });
      }
    },
    themeTextColor: {
      get() {
        let c = this.otherInfo.themeTextColor;
        return c;
      },
      set(v) {
        this.setOtherInfo({ themeTextColor: v });
      }
    }
  },
  methods: {
    clickThemePreset(item) {
      this.setOtherInfo({
        themeBackgroundColor: item.themeBackgroundColor,
        themeTextColor: item.themeTextColor
      });
    },
    closeDrawer(d) {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
      d();
    }
  }
};
</script>
<style scoped>
.themeSpan {
  display: inline-block;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  /* cursor: not-allowed; */
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
}
</style>