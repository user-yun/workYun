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
            width: "250",
            prop: "Uuid",
            align: "right",
            label: language.orderNumber,
            fixed: true,
        },
        {
            width: "200",
            prop: "Name",
            align: "center",
            label: language.payer,
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
            width: "200",
            prop: "Title",
            align: "center",
            label: language.paymentMerchant,
        },
        {
            width: "210",
            prop: "Date",
            align: "center",
            label: language.paymentOkTime,
        },
    ]
    return arr;
};