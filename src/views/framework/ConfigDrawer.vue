<template>
  <el-drawer
    :size=" otherInfo.menuCollapse ? '85%' : '35%' "
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
        <el-color-picker v-model="themeBackgroundColor"></el-color-picker>
      </el-form-item>
      <el-form-item class="alnlft">
        <span slot="label" class="normal">{{language.themeTextColor}}</span>
        <el-color-picker v-model="themeTextColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import mymixins from "@/mymixins";
export default {
  mixins: [mymixins],
  name: "drawer",
  data() {
    return {};
  },
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    //test: () => import('@/test/test.vue')
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
    //     return colors[Math.ceil(Math.random() * colors.length)];
    //   }
    // }
  },
  computed: {
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
    closeDrawer(d) {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
      d();
    }
  }
};
</script>
