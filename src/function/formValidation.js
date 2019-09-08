import store from '@/store';

let language = store.getters.getLanguage;
let unselected = language.unselected;
let uninput = language.uninput;
let msgUnSelect = { required: true, message: unselected, trigger: ["blur", "change"] };
let msgUnInput = { required: true, message: uninput, trigger: ["blur", "change"] };

let formVali = {
    factors: [msgUnInput],
    mode: [msgUnSelect],
    title: [msgUnSelect],
    name: [msgUnInput],
    preiod: [msgUnSelect],
    outputduty: [msgUnSelect],
    code: [msgUnInput],
    sourcecode: [msgUnInput],
    outputcode: [msgUnInput],
    Zongid: [msgUnSelect],
    Pid: [msgUnSelect],
    Type: [msgUnSelect],
    type: [msgUnSelect],
    Status: [msgUnSelect]
}
export default formVali;