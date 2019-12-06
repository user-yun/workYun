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
            width: "165",
            prop: "Param.orgtitle",
            align: "right",
            label: language.enterpriseName,
        },
        {
            width: "110",
            prop: "Param.contact",
            align: "right",
            label: language.contacts,
        },
        {
            width: "110",
            prop: "Param.phone",
            align: "right",
            label: language.phone,
        },
        {
            width: "110",
            prop: "Param.paymode",
            align: "right",
            label: language.paymentMode,
        },
        {
            width: "110",
            prop: "Status.status",
            align: "right",
            label: language.roleName,
        },
        {
            width: "180",
            prop: "Rechargetimestr",
            align: "right",
            label: language.rechargeTime,
        },
        {
            width: "110",
            prop: "Recharge",
            align: "right",
            label: language.rechargeAmount,
            format: true,
        },
        {
            width: "110",
            prop: "AmountRecharge",
            align: "right",
            label: language.cumulativeRecharge,
            format: true,
        },
        {
            width: "110",
            prop: "AmountExpense",
            align: "right",
            label: language.cumulativeExpenditure,
            format: true,
        },
        {
            width: "110",
            prop: "Balance",
            align: "right",
            label: language.accountBalance,
            format: true,
        },

    ]
    return arr;
};