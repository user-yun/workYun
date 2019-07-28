<template>
  <transition-group name="list-complete" tag="div">
    <el-row
      v-for=" (items,index) in data "
      v-if=" index < showNum "
      :style=" {height:height,width:'100%',listStyle:'none'} "
      :key="items.index"
      class="list-complete-item"
      @click.native="liCilck(items)"
      type="flex"
      align="middle"
    >
      <el-col
        v-for=" (item,index) in items.obj "
        :key="index"
        :span=" item.length"
        :style=" { height:height,textAlign:item.align ? item.align : 'left' , background: item.background ? item.background : '',
        overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',borderRadius:'0.26041vw',lineHeight:height, } "
        :offset=" item.offset ? item.offset : 0 "
      >{{item.text}}</el-col>
    </el-row>
  </transition-group>
</template>

<script>
export default {
  name: "VertRoll",
  data() {
    return {
      timer: null,
      data: [
        {
          index: 1,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 2,
          obj: [
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
          ]
        },
        {
          index: 3,
          obj: [
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
          ]
        },
        {
          index: 4,
          obj: [
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
        }
      ]
    };
  },
  props: {
    showNum: {
      type: Number,
      default: 3
    },
    aniTime: {
      type: Number,
      default: 4
    },
    height: {
      type: String,
      default: "2.77777vh"
    },
    vData: {
      type: Array,
      default: null
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  computed: {},
  watch: {
    vData: {
      handler(newValue, oldValue) {
        if (newValue != null) this.data = newValue;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    shuffle: function() {
      let item = this.data[0];
      this.data.splice(this.data.length, 0, item);
      this.data.splice(0, 1);
    },
    liCilck(items) {
      if (this.onClick) this.onClick(items);
    }
  },
  mounted() {
    this.timer = setInterval(this.shuffle, this.aniTime * 1000);
    document.body.style.overflowX = "hidden";
  },
  activited() {},
  created() {},
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
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
