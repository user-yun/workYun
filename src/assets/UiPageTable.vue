<template>
  <div style="height:100%;">
    <el-table
      ref="meltable"
      :data="tableData"
      :border="TableConfig.border"
      :stripe="TableConfig.stripe"
      :highlight-current-row="TableConfig.highlight"
      :height="TableConfig.disabled?'100%':'93%'"
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
        :width="item.width"
        :prop="item.prop"
        :label=" item.label ? item.label : item.prop "
        :sortable="item.sortable"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <pre v-if="item.json" :class="item.class ? item.class: 'emphasize' ">{{dataFormat(item.format,scope.row,scope.column)}}</pre>
          <span
            v-else
            :class="item.class ? item.class: 'emphasize' "
          >{{dataFormat(item.format,scope.row,scope.column)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!TableConfig.disabled"
      :small="false"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="PageConfig.total"
      :page-size="PageConfig.size"
      :current-page="page"
      @current-change="clickPage"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "UiPageTable",
  data() {
    return {
      page: 1,
      pageSize: 10
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
    PageConfig: {
      type: Object,
      default: () => {
        let obj = {
          total: 100,
          size: 10
        };
        return obj;
      }
    },
    TableConfig: {
      type: Object,
      default: () => {
        let obj = {
          border: true,
          stripe: true,
          highlight: true,
          showPage: false,
          multiple: false,
          single: false,
          disabled: true
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
  methods: {
    cellDataFormat(r, c) {
      let iof = c.property.indexOf(".");
      if (iof == -1) {
        return r[c.property];
      } else {
        let s = c.property.substring(0, iof);
        let e = c.property.substring(iof + 1, c.property.length);
        let data = r[s][e];
        return {
          data,
          s,
          e
        };
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
      if (o.columnIndex == 0 && this.TableConfig.single) {
        return { pointerEvents: "none", opacity: 0.1 };
      }
    },
    select(s, r) {
      if (this.TableConfig.multiple) {
        this.$emit("select", s);
      } else if (this.TableConfig.single) {
        this.$refs.meltable.clearSelection();
        this.$refs.meltable.toggleRowSelection(r);
        this.$emit("select", r);
      }
    },
    selectAll(s) {
      this.$emit("select", s);
    },
    clickPage(i) {
      this.page = i;
      this.$emit("clickPage", i, this.pageSize);
    },
    sizeChange(l) {
      this.pageSize = l;
      this.$emit("clickPage", this.page, l);
    }
  },
  mounted() {
    this.pageSize = this.PageConfig.size;
    // this.$emit("clickPage", this.page, this.pageSize);
  }
};
</script>
