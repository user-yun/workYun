<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      :border="TableConfig.border"
      :stripe="TableConfig.stripe"
      :highlight-current-row="TableConfig.highlight"
      height="95%"
      style="width:100%"
      @cell-dblclick="cellDblClick"
      header-cell-class-name="header-cell-class-name"
      cell-class-name="cell-class-name"
    >
      <el-table-column
        v-for="(item,index) in DataConfig"
        :key="index"
        :align="item.align"
        :width="item.width"
        :prop="item.prop"
        :label=" item.label ? item.label : item.prop "
        :sortable="item.sortable"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <span
            :class="item.mini ? 'ignore': 'normal' "
          >{{dataFormat(item.format,scope.row[scope.column.property])}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col align="center" v-show="TableConfig.showPage" :style="{fontSize:'150%',height:'4%'}">
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
// import mymixins from "@/mymixins";
export default {
  // mixins: [mymixins],
  name: "PageTable",
  data() {
    return {
      tableData: [{ test: "test" }]
    };
  },
  components: {},
  props: {
    TableConfig: {
      type: Object,
      default: () => {
        let obj = {
          border: true,
          stripe: true,
          highlight: true,
          showPage: true,
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
            mini: true,
            format: true
          }
        ];
        return arr;
      }
    }
  },
  computed: {
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
    dataFormat(is, data) {
      if (!is) return data;
      switch (typeof data) {
        case "string":
          return data.substr(0, 10);
        case "number":
          return data.toFixed(2);
        default:
          return data;
      }
    },
    cellDblClick(row, column) {
      this.$emit("cellDblClick", row, column);
    },
    clickPage(is) {
      this.$emit("clickPage", is);
    }
  }
};
</script>