import store from '@/store';

export default function f() {
    let language = store.getters.getLanguage;
    // align: "right",
    // width: "100",
    // prop: "test",
    // label: "test",
    // sortable: true,
    // fixed: true,
    // format: true,
    // json:true
    let arr = [
        {
            width: "150",
            prop: "orderTime",
            align: "center",
            label: language.orderTime,
        },

        {
            width: "140",
            prop: "accountingDate",
            align: "center",
            label: language.abcBookDate,
            type: "expand"
        },
        {
            width: "300",
            prop: "customerAccount",
            align: "center",
            label: language.customerAccount,
        },
        {
            width: "140",
            prop: "hostSerialNumber",
            align: "center",
            label: language.hostSerialNumber,
            type: "expand"
        },
        {
            width: "200",
            prop: "merchantAccount",
            align: "center",
            label: language.merchantAccount,
        },
        {
            width: "90",
            prop: "orderAmount",
            align: "center",
            label: language.orderAmount,
        },
        {
            width: "130",
            prop: "merchantAccountAmount",
            align: "center",
            label: language.merchantAccountAmount,
        },
        {
            width: "130",
            prop: "merchantCommissionFee",
            align: "center",
            label: language.merchantCommissionFee,
        },
        {
            width: "160",
            prop: "merchantInstallmentFee",
            align: "center",
            label: language.merchantInstallmentFee,
            type: "expand"
        },
        {
            width: "160",
            prop: "number9014",
            align: "center",
            label: language.number9014,
            type: "expand"
        },
        {
            width: "240",
            prop: "orderNo",
            align: "center",
            label: language.orderNo,
        },
        {
            width: "210",
            prop: "originalOrderNo",
            align: "center",
            label: language.originalOrderNo,
            type: "expand"
        },
        {
            width: "140",
            prop: "payType",
            align: "center",
            label: language.payType,
            type: "expand"
        },
        {
            width: "140",
            prop: "accountType",
            align: "right",
            label: language.payAccountType,
            // fixed: true,
        },
    ]
    return arr;
};