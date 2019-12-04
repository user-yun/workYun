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
            prop: "OrgTitle",
            align: "center",
            label: language.enterpriseName,
            sortable: true,
        },
        {
            width: "190",
            prop: "billingCycle",
            align: "center",
            label: language.billingCycle,
            sortable: true,
        },
        // {
        //     width: "120",
        //     prop: "Begin",
        //     align: "center",
        //     label: language.startDate,
        //     sortable: true,
        // },
        // {
        //     width: "120",
        //     prop: "End",
        //     align: "center",
        //     label: language.endDate,
        //     sortable: true,
        // },
        {
            width: "120",
            prop: "Paymodetext",
            align: "center",
            label: language.paymentMode,
            sortable: true,
        },
        {
            width: "120",
            prop: "Sum",
            align: "right",
            format: true,
            label: language.currentReceivable,
            sortable: true,
        },
        {
            width: "120",
            prop: "Pending",
            align: "right",
            format: true,
            label: language.currentToBeCollected,
            sortable: true,
        },
        {
            width: "120",
            prop: "Harvest",
            align: "right",
            format: true,
            label: language.realIncome,
            sortable: true,
        },
        {
            width: "120",
            prop: "Rechargetotal",
            align: "right",
            format: true,
            label: language.cumulativeRecharge,
            sortable: true,
        },
        {
            width: "120",
            prop: "Body",
            align: "right",
            format: true,
            label: language.contacts,
            sortable: true,
        },
        {
            width: "120",
            prop: "Mobile",
            align: "right",
            format: true,
            label: language.contactInFormation,
            sortable: true,
        },
        // {
        //     width: "170",
        //     prop: "Email",
        //     align: "right",
        //     label: language.email,
        //     sortable: true,
        // },
    ]
    return arr;
};