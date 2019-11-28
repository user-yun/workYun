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
            width: "240",
            prop: "billId",
            align: "center",
            fixed: true,
        },
        {
            width: "140",
            prop: "billTime",
            sortable: true,
            align: "center",
        },
        {
            width: "300",
            prop: "gover/orgTitle",
            format: true,
        },
        // {
        //     width: "120",
        //     prop: "orgTitle",
        //     align: "right",
        // },
        {
            width: "280",
            prop: "orderTime/payTime",
            align: "right",
            format: true,
        },
        {
            width: "180",
            prop: "amount",
            align: "right",
            sortable: true,
        },
        {
            width: "130",
            prop: "payScenes",
            align: "right",
            sortable: true,
        },
        {
            width: "130",
            prop: "payStatus",
            align: "right",
            sortable: true,
        },
        // {
        //     width: "100",
        //     prop: "payTime",
        // },
        {
            width: "130",
            prop: "rechargeWay",
        },
    ]
    return arr;
};