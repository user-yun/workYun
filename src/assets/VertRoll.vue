<template>
  <div class="shadow" ref="VertRoll" :style="{height:DHeight}">
    <transition-group name="list-complete" tag="div">
      <el-row
        v-for=" (items,index) in data "
        v-if=" index < showNum "
        :style=" {height:height,width:'100%',listStyle:'none'} "
        :key="index*data.length*(data.length+index)"
        class="list-complete-item"
        @click.native="liCilck(items)"
        type="flex"
        align="middle"
      >
        <el-col
          v-for=" (item,index) in items "
          :key="index*items.length*(items.length+index)"
          :span=" item.length"
          :style=" { height:height,textAlign:item.align ? item.align : 'left' , background: item.background ? item.background : '',
        overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',borderRadius:'0.26041vw',lineHeight:height, } "
          :offset=" item.offset ? item.offset : 0 "
        >{{item.text}}</el-col>
      </el-row>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "VertRoll",
  data() {
    return {
      timer: null,
      s: 0,
      data: [
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔3长6居右",
            align: "right",
            offset: 3,
            background: "#99a9bf"
          },
          {
            length: 12,
            text: "这是隔3长12居左",
            align: "left",
            offset: 3,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔2长6居左",
            align: "left",
            offset: 2,
            background: "#99a9bf"
          },
          {
            length: 6,
            text: "这是隔2长6居中",
            align: "center",
            offset: 2,
            background: "#99a9bf"
          },
          {
            length: 8,
            text: "这是隔0长8居右",
            align: "right",
            offset: 0,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 5,
            text: "这是隔1长5居右",
            align: "right",
            offset: 1,
            background: "#99a9bf"
          },
          {
            length: 6,
            text: "这是隔0长6居左",
            align: "left",
            offset: 0,
            background: "#99a9bf"
          },
          {
            length: 4,
            text: "这是隔2长4居右",
            align: "right",
            offset: 2,
            background: "#99a9bf"
          },
          {
            length: 6,
            text: "这是隔0长6居右",
            align: "right",
            offset: 0,
            background: "#99a9bf"
          }
        ]
      ]
    };
  },
  props: {
    vShowNum: {
      type: Number,
      default: 10
    },
    aniTime: {
      type: Number,
      default: 4
    },
    height: {
      type: String,
      default: "2.77777vh"
    },
    DHeight: {
      type: String,
      default: "20vh"
    },
    vData: {
      type: Array,
      default: null
    }
  },
  computed: {
    showNum: {
      get() {
        return this.s;
      },
      set(v) {
        this.s = v;
      }
    }
  },
  watch: {
    vShowNum: {
      handler(n, o) {
        if (n != null) this.s = n;
      },
      deep: true,
      immediate: true
    },
    vData: {
      handler(n, o) {
        if (n != null) this.data = n;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlerHeight() {
      let dh = parseFloat(this.DHeight);
      let h = parseFloat(this.height);
      let n = this.showNum;
      let i = Math.floor(dh / h);
      if (n > i) {
        this.s = i;
      }
    },
    shuffle: function() {
      let item = this.data[0];
      this.data.splice(this.data.length, 0, item);
      this.data.splice(0, 1);
    },
    liCilck(items) {
      this.$emit("onClick", items);
    }
  },
  mounted() {
    this.handlerHeight();
    if (this.showNum < this.data.length)
      this.timer = setInterval(this.shuffle, this.aniTime * 1000);
    document.body.style.overflowX = "hidden";
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    }
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-complete-item {
  transition: all 4s;
  display: block;
}
.list-complete-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.list-complete-enter
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transition: all 2s;
  transform: translateY(1vh);
  /* transform: scale(1.2) translateY(4.16666vh); */
}
.list-complete-leave-to {
  opacity: 0;
  transition: all 0.5s;
  transform: translateY(-1vh);
  /* transform: scale(0.1) translateY(-4.16666vh); */
}
.list-complete-leave-active {
  position: absolute;
}
</style>
