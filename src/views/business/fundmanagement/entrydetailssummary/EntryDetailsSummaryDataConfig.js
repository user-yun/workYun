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
        // {
        //     width: "300",
        //     prop: "trxType",
        //     align: "right",
        //     label: language.trxType,
        //     // fixed: true,
        // },
        {
            width: "140",
            prop: "payTypeID/orderDate",
            align: "center",
            label: language.payTypeID/language.orderDate,
            format: true,
        },
        // {
        //     width: "140",
        //     prop: "orderDate",
        //     align: "center",
        //     label: language.orderDate,
        // },
        {
            width: "140",
            prop: "orderTime/orderNo",
            align: "center",
            label: language.orderTime/language.orderNo,
            format: true,
        },
        // {
        //     width: "130",
        //     prop: "orderNo",
        //     align: "center",
        //     label: language.orderNo,
        // },
        // {
        //     width: "150",
        //     prop: "currencyCode",
        //     align: "center",
        //     label: language.currencyCode,
        // },
        {
            width: "160",
            prop: "orderAmount",
            align: "center",
            label: language.orderAmount,
        },
        {
            width: "160",
            prop: "fee",
            align: "center",
            label: language.fee,
        },
        // {
        //     width: "160",
        //     prop: "wechatOfficialAccountNo",
        //     align: "center",
        //     label: language.wechatOfficialAccountNo,
        // },
        {
            width: "160",
            prop: "openId",
            align: "center",
            label: language.openId,
        },
        {
            width: "240",
            prop: "receiveAccount",
            align: "center",
            label: language.receiveAccount,
        },
        {
            width: "210",
            prop: "receiveAccName",
            align: "center",
            label: language.receiveAccName,

        },
        {
            width: "210",
            prop: "isBreakAccount",
            align: "center",
            label: language.isBreakAccount,
        },
        {
            width: "210",
            prop: "commodityType",
            align: "center",
            label: language.commodityType,
        },
        {
            width: "210",
            prop: "splitMerchantID",
            align: "center",
            label: language.splitMerchantID,
        },
        {
            width: "210",
            prop: "splitAmount",
            align: "center",
            label: language.splitAmount,
        },
        {
            width: "210",
            prop: "orderStatus",
            align: "center",
            label: language.orderStatus,
        },
        {
            width: "210",
            prop: "hostDate",
            align: "center",
            label: language.hostDate,
        },
        {
            width: "210",
            prop: "hostTime",
            align: "center",
            label: language.hostTime,
        },
        {
            width: "210",
            prop: "batchNo",
            align: "center",
            label: language.batchNo,
        },
        {
            width: "210",
            prop: "devId",
            align: "center",
            label: language.devId,
        },
        {
            width: "210",
            prop: "pcode",
            align: "center",
            label: language.pcode,
        },
        {
            width: "210",
            prop: "userid",
            align: "center",
            label: language.userid,
        },
        {
            width: "210",
            prop: "title",
            align: "center",
            label: language.title,
        },
        {
            width: "210",
            prop: "name",
            align: "center",
            label: language.name,
        },
        {
            width: "210",
            prop: "address",
            align: "center",
            label: language.address,
        },
        {
            width: "210",
            prop: "phone",
            align: "center",
            label: language.phone,
        },
    ]
    return arr;
};