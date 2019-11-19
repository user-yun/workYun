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
            width: "190",
            prop: "Submerid",
            align: "right",
            label: language.subMerchantsId,
            fixed: true,
        },
        {
            width: "130",
            prop: "Submername",
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
            prop: "Contactname",
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
            prop: "Certificateno",
            align: "center",
            label: language.personInChargeCertificatesNum,
            type: "expand"
        },
        {
            width: "200",
            prop: "Merchantname",
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
            prop: "Mercertificatenum",
            align: "center",
            label: language.enterpriseCertificatesNum,
            type: "expand"
        },
        {
            width: "120",
            prop: "Receiveaccountname",
            align: "center",
            label: language.receiveName,
        },
        {
            width: "280",
            prop: "Receiveaccount",
            align: "center",
            label: language.receiveAccount,
        },
        {
            width: "230",
            prop: "Receivebankname",
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
            prop: "Bankmobilenum",
            align: "center",
            label: language.bankReservePhone,
            type: "expand"
        },
        {
            width: "140",
            prop: "Mermobilephonenum",
            align: "center",
            label: language.personInChargePhone,
        },
        {
            width: "200",
            prop: "Opendate",
            align: "center",
            label: language.subMerchantsOpenTime,
            type: "expand"
        },
        {
            width: "200",
            prop: "Reviewdate",
            align: "center",
            label: language.subMerchantsAuditTime,
            type: "expand"
        },
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