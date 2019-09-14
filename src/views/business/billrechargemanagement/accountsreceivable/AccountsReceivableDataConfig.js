import store from '@/store';

export default function f() {
    let language = store.getters.getLanguage;
    // align: "right",
    // width: "100",
    // prop: "test",
    // label: "test",
    // sortable: true,
    // fixed: true,
    // mini: true,
    // format: true,
    // json:true
    let arr = [
        {
            width: "100",
            prop: "OrgTitle",
            align: "center",
            fixed: true,
            mini: true,
            label: language.enterpriseName,
        },
        {
            width: "180",
            prop: "billingCycle",
            align: "center",
            mini: true,
            label: language.billingCycle,
        },
        {
            width: "100",
            align: "center",
            prop: "Paymodetext",
            label: language.paymentMode,
            mini: true,
            // json: true
        },
        {
            width: "130",
            prop: "Sum",
            sortable: true,
            align: "right",
            format: true,
            label: language.currentReceivable,
            mini: true,
        },
        {
            width: "130",
            prop: "Pending",
            align: "right",
            sortable: true,
            format: true,
            label: language.currentToBeCollected,
            mini: true,
        },
        {
            width: "130",
            prop: "Harvest",
            align: "right",
            label: language.realIncome,
            sortable: true,
            format: true,
            mini: true,
        },
        {
            width: "130",
            prop: "Rechargetotal",
            align: "right",
            sortable: true,
            label: language.cumulativeRecharge,
            format: true,
            mini: true,
        },
        {
            width: "130",
            prop: "Balanceaccount",
            align: "right",
            sortable: true,
            label: language.accountBalance,
            format: true,
            mini: true,
        },
        {
            width: "100",
            align: "center",
            prop: "Body",
            label: language.contacts,
            mini: true,
        },
        {
            width: "130",
            align: "right",
            prop: "Mobile",
            label: language.contactInformation,
            mini: true,
        },
    ]
    return arr;
};