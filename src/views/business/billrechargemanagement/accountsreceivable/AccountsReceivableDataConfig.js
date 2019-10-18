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
            width: "100",
            prop: "OrgTitle",
            align: "center",
            fixed: true,
            label: language.enterpriseName,
        },
        {
            width: "180",
            prop: "billingCycle",
            align: "center",
            label: language.billingCycle,
        },
        {
            width: "100",
            align: "center",
            prop: "Paymodetext",
            label: language.paymentMode,
            // json: true
        },
        {
            width: "130",
            prop: "Sum",
            sortable: true,
            align: "right",
            format: true,
            label: language.currentReceivable,
        },
        {
            width: "130",
            prop: "Pending",
            align: "right",
            sortable: true,
            format: true,
            label: language.currentToBeCollected,
        },
        {
            width: "130",
            prop: "Harvest",
            align: "right",
            label: language.realIncome,
            sortable: true,
            format: true,
        },
        {
            width: "130",
            prop: "Rechargetotal",
            align: "right",
            sortable: true,
            label: language.cumulativeRecharge,
            format: true,
        },
        {
            width: "130",
            prop: "Balanceaccount",
            align: "right",
            sortable: true,
            label: language.accountBalance,
            format: true,
        },
        {
            width: "100",
            align: "center",
            prop: "Body",
            label: language.contacts,
        },
        {
            width: "130",
            align: "right",
            prop: "Mobile",
            label: language.contactInFormation,
        },
    ]
    return arr;
};