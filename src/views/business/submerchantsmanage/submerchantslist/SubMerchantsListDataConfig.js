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
            prop: "SubMerId",
            align: "right",
            label: language.subMerchantsId,
            fixed: true,
        },
        {
            width: "130",
            prop: "SubMerName",
            align: "center",
            label: language.subMerchantsName,
            fixed: true,
        },
        {
            width: "130",
            prop: "SubMerType",
            align: "center",
            label: language.subMerchantsType,
            type: "expand"
        },
        {
            width: "120",
            prop: "ContactName",
            align: "center",
            label: language.personInChargeName,
        },
        {
            width: "160",
            prop: "CertificateType",
            align: "center",
            label: language.personInChargeCertificatesType,
            type: "expand"
        },
        {
            width: "200",
            prop: "CertificateNo",
            align: "center",
            label: language.personInChargeCertificatesNum,
            type: "expand"
        },
        {
            width: "200",
            prop: "MerchantName",
            align: "center",
            label: language.enterpriseName,
        },
        {
            width: "180",
            prop: "MerCertificateType",
            align: "center",
            label: language.enterpriseCertificatesType,
            type: "expand"
        },
        {
            width: "250",
            prop: "MerCertificateNum",
            align: "center",
            label: language.enterpriseCertificatesNum,
            type: "expand"
        },
        {
            width: "120",
            prop: "ReceiveAccountName",
            align: "center",
            label: language.receiveName,
        },
        {
            width: "280",
            prop: "ReceiveAccount",
            align: "center",
            label: language.receiveAccount,
        },
        {
            width: "230",
            prop: "ReceiveBankName",
            align: "center",
            label: language.receiveBank,
        },
        {
            width: "140",
            prop: "ReceiveAccountType",
            align: "center",
            label: language.receiveAccountType,
            type: "expand"
        },
        {
            width: "140",
            prop: "BankMobileNum",
            align: "center",
            label: language.bankReservePhone,
            type: "expand"
        },
        {
            width: "140",
            prop: "MerMobilePhoneNum",
            align: "center",
            label: language.personInChargePhone,
        },
        {
            width: "200",
            prop: "OpenDate",
            align: "center",
            label: language.subMerchantsOpenTime,
            type: "expand"
        },
        {
            width: "200",
            prop: "ReviewDate",
            align: "center",
            label: language.subMerchantsAuditTime,
            type: "expand"
        },
        {
            width: "170",
            prop: "Status",
            align: "center",
            label: language.auditState,
            type: "expand"
        },
    ]
    return arr;
};