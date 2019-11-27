<template>
  <div class="w100 h100 alncnt" v-if="isActivated">
    <el-tooltip
      placement="top-end"
      :disabled="!(TableConfig.multiple || TableConfig.single)||thisNotShow"
      class="bttooltip"
    >
      <div slot="content">
        {{language.tableSelectTooltip}}
        <br>
        <el-button type="text" @click.stop="thisNotShow=true">{{language.thisNotShow}}</el-button>
        <el-button type="text" @click.stop="tableNotShowFun">{{language.tableNotShow}}</el-button>
      </div>
      <el-table
        ref="meltable"
        :data="tableData"
        :border="TableConfig.border"
        :stripe="TableConfig.stripe"
        :highlight-current-row="TableConfig.highlight"
        :height="TableConfig.disabled ? '99.7%':'95%'"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        @cell-dblclick="cellDblClick"
        @select="select"
        @select-all="selectAll"
        @row-dblclick="rowDb"
        @selection-change="selectionChange"
      >
        <el-table-column
          v-if="TableConfig.multiple || TableConfig.single"
          type="selection"
          width="50"
          fixed
        ></el-table-column>
        <el-table-column type="index" width="60" align="center" fixed></el-table-column>
        <el-table-column
          v-for="(item,index) in handlerDataConfig.table"
          :key="index"
          :align="item.align"
          :width="item.width*widthScale"
          :prop="item.prop"
          :label=" item.label ? item.label : item.prop "
          :sortable="item.sortable"
          :fixed="item.fixed"
        >
          <template slot="header" slot-scope="scope">
            <span :class="item.class ? item.class: 'tableClass' ">{{scope.column.label}}</span>
          </template>
          <template slot-scope="scope">
            <pre v-if="item.json" :class="item.class ? item.class: 'tableClass' ">{{dataFormat(item.format,scope.row,scope.column)}}</pre>
            <span
              v-else
              :class="item.class ? item.class: 'tableClass' "
            >{{dataFormat(item.format,scope.row,scope.column)}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="handlerDataConfig.expand.length>0" type="expand">
          <template slot-scope="scope">
            <el-form class="w100" inline label-width="40%">
              <fragment v-for="(item,index) in handlerDataConfig.expand" :key="index">
                <el-form-item style="width:32%">
                  <span slot="label" :class="item.class ? item.class: 'tableClass' ">{{item.label}}</span>
                  <span
                    :class="item.class ? item.class: 'tableClass' "
                  >{{dataFormat(item.format,scope.row,{property:item.prop})}}</span>
                </el-form-item>
              </fragment>
            </el-form>
          </template>
        </el-table-column>
        <fragment v-if="TableConfig.button">
          <el-table-column
            :width="TableConfig.button.width*widthScale"
            :fixed="TableConfig.button.fixed?TableConfig.button.fixed:'right'"
            :label="TableConfig.button.label?TableConfig.button.label:'*'"
            :align="TableConfig.button.align?TableConfig.button.align:'center'"
          >
            <template slot-scope="scope">
              <fragment v-for="(btitem,bti) in TableConfig.button.list" :key="bti">
                <mdb
                  :type="btitem.type"
                  @click="handleButton(scope.row,btitem.text)"
                >{{btitem.text}}</mdb>
              </fragment>
            </template>
          </el-table-column>
        </fragment>
      </el-table>
    </el-tooltip>
    <el-pagination
      v-if="!TableConfig.disabled"
      :small="false"
      background
      layout="total, prev, pager, next, jumper"
      :total="PageConfig.total"
      :page-size="PageConfig.size"
      :current-page="page"
      @current-change="clickPage"
      @size-change="sizeChange"
    ></el-pagination>
    <!-- layout="total, sizes, prev, pager, next, jumper" -->
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "UiPageTable",
  data() {
    return {
      page: 1,
      pageSize: 10,
      widthScale: 1,
      singleRow: {},
      isActivated: true,
      thisNotShow: false
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
        let c = "padding:4px";
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
          multiple: false,
          single: false,
          disabled: true,
          button: {
            fixed: "right",
            label: "manage",
            width: 100,
            list: [
              { text: "add", type: "primary" },
              { text: "delete", type: "danger" }
            ]
          }
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
            json: true,
            type: "expand"
          }
        ];
        return arr;
      }
    }
  },
  computed: {
    handlerDataConfig() {
      let table = [];
      let expand = [];
      this.DataConfig.forEach(e => {
        if (e.type == "expand") {
          expand.push(e);
        } else {
          table.push(e);
        }
      });
      return { table, expand };
    }
  },
  watch: {
    "otherInfo.tableNotShow": {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.thisNotShow = newv;
      }
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
    rowDb(r) {
      if (this.TableConfig.single) {
        this.$refs.meltable.clearSelection();
        if (this.singleRow != r) {
          this.$refs.meltable.toggleRowSelection(r);
          this.singleRow = r;
          return;
        } else {
          this.singleRow = {};
          return;
        }
      } else {
        this.$refs.meltable.toggleRowSelection(r);
      }
    },
    selectionChange(s) {
      if (this.TableConfig.single) {
        this.$emit("select", s.slice(-1));
      } else {
        this.$emit("select", s);
      }
    },
    select(s, r) {
      if (this.TableConfig.single) {
        this.$refs.meltable.clearSelection();
        if (this.singleRow != r) {
          this.$refs.meltable.toggleRowSelection(r);
          this.singleRow = r;
          return;
        } else {
          this.singleRow = {};
          return;
        }
      }
    },
    clickPage(i) {
      this.page = i;
      this.$emit("clickPage", i, this.pageSize);
    },
    sizeChange(l) {
      this.pageSize = l;
      this.page = 1;
      this.$emit("clickPage", this.page, l);
    },
    resetPage() {
      this.page = 1;
      this.$emit("clickPage", this.page, this.pageSize);
    },
    handleButton(r, b) {
      this.$emit("clickButton", r, b);
    },
    tableNotShowFun() {
      this.thisNotShow = true;
      this.setOtherInfo({ tableNotShow: true });
    }
  },
  mounted() {
    this.pageSize = this.PageConfig.size;
    window.addEventListener("resize", this.widthScaleHandler);
    // this.$emit("clickPage", this.page, this.pageSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.widthScaleHandler);
  },
  activated() {
    this.handCss();
    this.isActivated = true;
  },
  deactivated() {
    this.isActivated = false;
  }
};
</script>