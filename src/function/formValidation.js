import Vue from 'vue'
let language = Vue.$store.getters.getLanguage;
let unselected = language.unselected;
let uninput = language.uninput;

let msgUnSelect = { required: true, message: unselected, trigger: ["blur", "change"] };
let msgUnInput = { required: true, message: uninput, trigger: ["blur", "change"] };

export function publicBoothConfigVali(son, arr) {
    let TwoArrays = (rule, value, callback) => {
        if (son.length < 1 && arr.length < 1) {
            callback(new Error(unselected));
        } else {
            Vue.$refs.ruleForm.clearValidate(["arr", "son"]);
            callback();
        }
    };
    let vali = {

    }
    return vali;
};