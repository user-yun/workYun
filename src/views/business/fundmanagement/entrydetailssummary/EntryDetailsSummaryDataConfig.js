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
            width: "210",
            prop: "OrderNumber",
            align: "right",
            label: language.orderNumber,
            fixed: true,
        },
        {
            width: "160",
            prop: "Payer",
            align: "center",
            label: language.payer,
        },
        {
            width: "160",
            prop: "PaymentChannel",
            align: "center",
            label: language.paymentChannel,
        },
        {
            width: "160",
            prop: "PaymentAmount",
            align: "center",
            label: language.paymentAmount,
        },
        {
            width: "170",
            prop: "PaymentMerchant",
            align: "center",
            label: language.paymentMerchant,
        },
        {
            width: "210",
            prop: "PaymentOkTime",
            align: "center",
            label: language.paymentOkTime,
        },
    ]
    return arr;
};