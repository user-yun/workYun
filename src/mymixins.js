let m = {
  data() {
    return {
      h: "https://spmp.zg118.com/server"
      // h: "http://192.168.8.48:8888"
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    },
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {
    // userInfo: {
    //   handler(newValue, oldValue) {
    //     this.log({ text: "userInfo", newValue });
    //   },
    //   immediate: true, //最初监听
    //   deep: true //深度监听
    // },
    // otherInfo: {
    //   handler(newValue, oldValue) {
    //     this.log({ text: "otherInfo", newValue });
    //   },
    //   immediate: true, //最初监听
    //   deep: true //深度监听
    // }
  },
  methods: {
    log(t) {
      console.log(t);
    },
    deleteOtherInfo(k) {
      //删除其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "deleteOtherInfo",
        value: {
          key: k
        }
      });
    },
    setOtherInfo(v) {
      //设置其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "setOtherInfo",
        value: v
      });
    },
    deleteUserInfo(k) {
      //删除用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "deleteUserInfo",
        value: {
          key: k
        }
      });
    },
    setUserInfo(v) {
      //设置用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "setUserInfo",
        value: v
      });
    },
    post(u, p) {
      return new Promise((resolve, reject) => {
        this.$Post(this.h + u, p).then(res => {
          resolve(res)
          this.log({
            u,
            res
          });
          let c = res.ErrCode != undefined ? res.ErrCode : res.Code;
          let i = this.ifServerCode(c)
          this.eleNotify(i, res.ErrMsg);
        }).catch((e) => {
          reject(e)
        });
      });
    },
    get(u, p) {
      return new Promise((resolve, reject) => {
        this.$Get(this.h + u, p).then(res => {
          resolve(res)
          this.log({
            u,
            res
          });
          let c = res.ErrCode != undefined ? res.ErrCode : res.Code;
          let i = this.ifServerCode(c)
          this.eleNotify(i, res.ErrMsg);
        }).catch((e) => {
          reject(e)
        });
      });

    },
    isFalse(o) {
      if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
      return false
    },
    ihTrue(d) {
      switch (typeof d) {
        case "string":
          return d.length > 0;
        case "number":
          return true;
        case "boolean":
          return d;
        case "object":
          if (d == "undefined" || Object.keys(d).length < 0 || d.length < 0) {
            return false;
          } else
            return true;
        default:
          return false;
      }
    },
    dataFormat(d) {
      switch (typeof d) {
        case "string":
          return d.substr(0, 10);
        case "number":
          return d.toFixed(2);
        default:
          return d;
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
        return {
          data,
          s,
          e,
        };
      }
    },
    eleNotify(i, t) {
      //message
      //notify
      this.$message({
        message: t,
        type: this.eleIfType(i),
        duration: 3000,
        customClass: "messageBox"
      });
    },
    ifServerCode(i) {
      let s = [0];//成功
      let w = [];//警告
      let e = [10101, 10211, 10212, 10213, 10214, 10215, 10216];//失败
      if (s.includes(i)) {
        return 1;
        // } else if (w.includes(i)) {
        // return 2;
      } else if (e.includes(i)) {
        return 3;
      } else return 2;
    },
    eleIfType(i) {
      switch (i) {
        case 1:
          return "success";
        case 2:
          return "warning";
        case 3:
          return "error";
        default:
          return "info";
      }
    }
  },
  created() { }
};
export default m;