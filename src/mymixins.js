
let mixin = {
  data() {
    return {
      httpURL: "http://121.196.211.83:7779"
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
    log(text) {
      console.log(text);
    },
    deleteOtherInfo(key) {
      //删除其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "deleteOtherInfo",
        value: {
          key: key
        }
      });
    },
    setOtherInfo(value) {
      //设置其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "setOtherInfo",
        value: value
      });
    },
    deleteUserInfo(key) {
      //删除用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "deleteUserInfo",
        value: {
          key: key
        }
      });
    },
    setUserInfo(value) {
      //设置用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "setUserInfo",
        value: value
      });
    },
    post(url, param) {
      return new Promise((resolve, reject) => {
        this.$Post(this.httpURL + url, param).then(res => {
          this.log(res);
          if (false) { }
          else
            resolve(res)
        }).catch((error) => {
          reject(error)
        });
      });
    },
    get(url, param) {
      return new Promise((resolve, reject) => {
        this.$Get(this.httpURL + url, param).then(res => {
          this.log(res);
          if (false) { }
          else
            resolve(res)
        }).catch((error) => {
          reject(error)
        });
      });

    },
    isFalse(o) {
      if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
      return false
    }
  },
};
export default mixin;