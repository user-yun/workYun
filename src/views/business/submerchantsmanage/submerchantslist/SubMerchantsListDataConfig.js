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
            width: "220",
            prop: "subMerId",
            align: "right",
            label: language.subMerchantsId,
            fixed: true,
        },
        {
            width: "220",
            prop: "subMerName",
            align: "center",
            label: language.subMerchantsName,
            fixed: true,
        },
        {
            width: "130",
            prop: "SubmertypeText",
            align: "center",
            label: language.subMerchantsType,
            type: "expand"
        },
        {
            width: "120",
            prop: "contactName",
            align: "center",
            label: language.personInChargeName,
        },
        {
            width: "160",
            prop: "CertificatetypeText",
            align: "center",
            label: language.personInChargeCertificatesType,
            type: "expand"
        },
        {
            width: "200",
            prop: "certificateNo",
            align: "center",
            label: language.personInChargeCertificatesNum,
            type: "expand"
        },
        {
            width: "200",
            prop: "companyName",
            align: "center",
            label: language.enterpriseName,
        },
        {
            width: "180",
            prop: "MercertificatetypeText",
            align: "center",
            label: language.enterpriseCertificatesType,
            type: "expand"
        },
        {
            width: "250",
            prop: "companyCertNo",
            align: "center",
            label: language.enterpriseCertificatesNum,
            type: "expand"
        },
        {
            width: "250",
            prop: "accountName",
            align: "center",
            label: language.receiveName,
        },
        {
            width: "230",
            prop: "account",
            align: "center",
            label: language.receiveAccount,
        },
        {
            width: "230",
            prop: "bankName",
            align: "center",
            label: language.receiveBank,
        },
        {
            width: "140",
            prop: "ReceiveaccounttypeText",
            align: "center",
            label: language.receiveAccountType,
            type: "expand"
        },
        {
            width: "140",
            prop: "mobilePhone",
            align: "center",
            label: language.bankReservePhone,
            type: "expand"
        },
        {
            width: "140",
            prop: "merMobilePhone",
            align: "center",
            label: language.personInChargePhone,
            type: "expand"
        },
        // {
        //     width: "200",
        //     prop: "Opendate",
        //     align: "center",
        //     label: language.subMerchantsOpenTime,
        //     type: "expand"
        // },
        // {
        //     width: "200",
        //     prop: "Reviewdate",
        //     align: "center",
        //     label: language.subMerchantsAuditTime,
        //     type: "expand"
        // },
        {
            width: "170",
            prop: "StatusText",
            align: "center",
            label: language.auditState,
            type: "expand"
        },
    ]
    return arr;
};