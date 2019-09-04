<template>
  <div>
    <el-date-picker
      v-model="day"
      :editable="false"
      :type="typeS[type]"
      :value-format="valueF[type]"
      @change="picker"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePickerMult",
  data() {
    return {
      day: [],
      typeS: ["daterange", "monthrange"],
      valueF: ["yyyy-MM-dd", "yyyy-MM"]
    };
  },
  props: {
    type: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    dayNum: {
      type: Number,
      default: () => {
        return 30;
      }
    }
  },
  watch: {},
  methods: {
    picker() {
      this.$emit("change", this.day);
    }
  },
  mounted() {
    //渲染
    let date = new Date();
    this.day.push(date.format("yyyy-MM-dd"));
    date.setDate(date.getDate() - this.dayNum);
    this.day.push(date.format("yyyy-MM-dd"));
  }
};
</script>