<template>
  <div class="h100">
    <el-table
      ref="meltable"
      :data="tableData"
      :border="TableConfig.border"
      :stripe="TableConfig.stripe"
      :highlight-current-row="TableConfig.highlight"
      :height="TableConfig.disabled ? '93%':'99.9%'"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      @cell-dblclick="cellDblClick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column
        v-if="TableConfig.multiple || TableConfig.single"
        type="selection"
        width="44"
        fixed
      ></el-table-column>
      <el-table-column type="index" width="60" align="center" fixed></el-table-column>
      <el-table-column
        v-for="(item,index) in DataConfig"
        :key="index"
        :align="item.align"
        :width="item.width*widthScale"
        :prop="item.prop"
        :label=" item.label ? item.label : item.prop "
        :sortable="item.sortable"
        :fixed="item.fixed"
      >
        <template slot="header" slot-scope="scope">
          <span :class="item.class ? item.class: 'emphasize' ">{{scope.column.label}}</span>
        </template>
        <template slot-scope="scope">
          <pre v-if="item.json" :class="item.class ? item.class: 'emphasize' ">{{dataFormat(item.format,scope.row,scope.column)}}</pre>
          <span
            v-else
            :class="item.class ? item.class: 'emphasize' "
          >{{dataFormat(item.format,scope.row,scope.column)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="alncnt" v-if="TableConfig.disabled" :style="{fontSize:'150%',height:'4%'}">
      <i
        class="el-icon-arrow-left"
        :style="{color: pageDis == null || pageDis == 'right' ? '#409EFF':'transparent'}"
        @click="clickPage(false)"
      ></i>
      <i
        class="el-icon-arrow-right"
        :style="{color: pageDis == null || pageDis == 'left' ? '#409EFF':'transparent'}"
        @click="clickPage(true)"
      ></i>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "PageTable",
  data() {
    return {
      widthScale: 1,
      singleRow: {}
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        let arr = [{ test: "test" }];
        return arr;
      }
    },
    cellStyle: {
      default: () => {
        let c = "padding:0vw";
        return c;
      }
    },
    TableConfig: {
      type: Object,
      default: () => {
        let obj = {
          border: true,
          stripe: true,
          highlight: true,
          multiple: false,
          single: false,
          disabled: ""
        };
        return obj;
      }
    },
    DataConfig: {
      type: Array,
      default: () => {
        let arr = [
          {
            align: "right",
            width: "100",
            prop: "test",
            label: "test",
            sortable: true,
            fixed: true,
            format: true,
            json: true
          }
        ];
        return arr;
      }
    }
  },
  computed: {
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    },
    pageDis() {
      let text = null;
      let dis = this.TableConfig.disabled;
      if (dis && dis.length > 0) {
        text = dis;
      }
      return text;
    }
  },
  methods: {
    widthScaleHandler() {
      if (this.otherInfo.tableSelfAW) {
        let w = document.body.clientWidth;
        let ws = w / 1920 <= 0.6 ? 0.6 : w / 1920;
        this.widthScale = ws;
      }
    },
    handCss() {
      if (this.TableConfig.single) {
        this.$addCSS(".el-checkbox__inner{ border-radius:7px;}");
      } else {
        this.$addCSS(".el-checkbox__inner{ border-radius:2px;}");
      }
    },
    cellDataFormat(r, c) {
      let iof = c.property.indexOf(".");
      if (iof == -1) {
        return r[c.property];
      } else {
        let s = c.property.substring(0, iof);
        let e = c.property.substring(iof + 1, c.property.length);
        let data = r[s][e];
        return data;
        // return {
        //   data,
        //   s,
        //   e
        // };
      }
    },
    dataFormat(is, r, c) {
      let data = this.cellDataFormat(r, c);
      if (!is) return data;
      try {
        switch (typeof data) {
          case "string":
            return data.substr(0, 10);
          case "number":
            return data.toFixed(2);
          case "object":
            let t = "";
            data.forEach(e => {
              t += e;
            });
            return t;
          default:
            return JSON.stringify(data).substr(0, 10);
        }
      } catch (e) {
        return JSON.stringify(data);
      }
    },
    cellDblClick(r, c) {
      this.$emit("cellDblClick", r, c);
    },
    headerCellStyle(o) {
      this.handCss();
      if (o.columnIndex == 0 && this.TableConfig.single) {
        return { pointerEvents: "none", opacity: 0.4 };
      }
    },
    refSelectAll() {
      this.$refs.meltable.toggleAllSelection();
    },
    select(s, r) {
      if (this.TableConfig.single) {
        this.$refs.meltable.clearSelection();
        if (this.singleRow != r) {
          this.$refs.meltable.toggleRowSelection(r);
          this.singleRow = r;
          this.$emit("select", [r]);
          return;
        } else {
          this.singleRow = {};
          this.$emit("select", []);
          return;
        }
      }
      this.$emit("select", s);
    },
    selectAll(s) {
      this.$emit("select", s);
    },
    clickPage(is) {
      this.$emit("clickPage", is);
    }
  },
  mounted() {
    window.addEventListener("resize", this.widthScaleHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.widthScaleHandler);
  },
  activated() {
    this.handCss();
  }
};
</script>
