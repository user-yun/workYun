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
            width: "300",
            prop: "Thirdorderno",
            align: "right",
            label: language.merchantsOrderNumber,
            // fixed: true,
            type: "expand"
        },
        {
            width: "200",
            prop: "Name",
            align: "center",
            label: language.resident,
        },
        {
            width: "200",
            prop: "Phone",
            align: "center",
            label: language.residentPhone,
        },
        {
            width: "140",
            prop: "PaymentChannel",
            align: "center",
            label: language.paymentChannel,
        },
        {
            width: "130",
            prop: "Money",
            align: "center",
            label: language.paymentAmount,
        },
        {
            width: "150",
            prop: "billState",
            align: "center",
            label: language.billState,
        },
        {
            width: "160",
            prop: "Submername",
            align: "center",
            label: language.paymentMerchant,
        },
        {
            width: "160",
            prop: "Devid",
            align: "center",
            label: language.deviceId,
            type: "expand"
        },
        {
            width: "160",
            prop: "Title",
            align: "center",
            label: language.devBindHouseName,
            type: "expand"
        },
        {
            width: "160",
            prop: "Mermobilephonenum",
            align: "center",
            label: language.businessPhone,
        },
        {
            width: "210",
            prop: "Date",
            align: "center",
            label: language.orderCreateTime,
            type: "expand"
        },
        {
            width: "210",
            prop: "Paytime",
            align: "center",
            label: language.paymentOkTime,
        },
    ]
    return arr;
};