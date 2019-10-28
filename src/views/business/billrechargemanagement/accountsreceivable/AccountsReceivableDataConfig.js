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
            width: "230",
            // prop: "OrgTitle",
            prop: "Orgtitle",
            align: "center",
            fixed: true,
            // label: language.enterpriseName,

        },
        {
            width: "160",
            // prop: "billingCycle",
            prop: "Month",
            align: "center",
            // label: language.billingCycle,
            sortable: true,
        },
        {
            width: "180",
            // prop: "Paymodetext",
            prop: "AllPower",
            align: "right",
            // label: language.paymentMode,
            sortable: true,
        },
        {
            width: "180",
            align: "right",
            // prop: "Paymodetext",
            prop: "Totalcost",
            // label: language.paymentMode,
            sortable: true,
        },
        {
            width: "180",
            align: "right",
            // prop: "Paymodetext",
            prop: "Status",
            // label: language.paymentMode,
            sortable: true,
        },
        // {
        //     width: "130",
        //     prop: "Sum",
        //     sortable: true,
        //     align: "right",
        //     format: true,
        //     // label: language.currentReceivable,
        //     type: Number
        // },
        // {
        //     width: "130",
        //     prop: "Pending",
        //     align: "right",
        //     sortable: true,
        //     format: true,
        //     // label: language.currentToBeCollected,
        //     type: Number
        // },
        // {
        //     width: "130",
        //     prop: "Harvest",
        //     align: "right",
        //     // label: language.realIncome,
        //     sortable: true,
        //     format: true,
        //     type: Number
        // },
        // {
        //     width: "130",
        //     prop: "Rechargetotal",
        //     align: "right",
        //     sortable: true,
        //     // label: language.cumulativeRecharge,
        //     format: true,
        //     type: Number
        // },
        // {
        //     width: "130",
        //     prop: "Balanceaccount",
        //     align: "right",
        //     sortable: true,
        //     // label: language.accountBalance,
        //     format: true,
        //     type: Number
        // },
        // {
        //     width: "100",
        //     align: "center",
        //     prop: "Body",
        //     // label: language.contacts,
        // },
        // {
        //     width: "130",
        //     align: "right",
        //     prop: "Mobile",
        //     // label: language.contactInFormation,
        // },
    ]
    return arr;
};