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
        width: "170",
        prop: "title",
        sortable: true,
        fixed: true,
    },
    {
        width: "300",
        prop: "id/zoneid",
        format: true,
        fixed: true,
    },
    // {
    //     width: "260",
    //     prop: "pid",
    // },
    // {
    //     width: "130",
    //     prop: "devid",
    //     sortable: true,
    // },
    // {
    //     width: "140",
    //     prop: "zoneid",
    // },
    {
        width: "280",
        prop: "pcode/pid",
        format: true
    },
    // {
    //     width: "100",
    //     prop: "project",
    //     sortable: true,
    // },
    // {
    //     width: "130",
    //     prop: "powerFactor",
    //     sortable: true,
    // },
    {
        width: "80",
        prop: "type",
        sortable: true,
    },
    {
        width: "100",
        prop: "voltage",
        sortable: true,
        format: true,
        type: "expand"
    },
    {
        width: "110",
        prop: "allPower",
        sortable: true,
        format: true
    },
    {
        width: "100",
        prop: "current",
        sortable: true,
        format: true,
        type: "expand"
    },
    {
        width: "130",
        prop: "activePower",
        sortable: true,
        format: true,
        type: "expand"
    },
    {
        width: "90",
        prop: "param",
        sortable: true,
        format: true,
        type: "expand"
    },
    // {
    //     width: "100",
    //     prop: "remark",
    //     sortable: true,
    //     format: true
    // },
    {
        width: "110",
        prop: "status",
        json: true
    },
    {
        width: "110",
        prop: "report",
        sortable: true,
        format: true,
        type: "expand"
    },
    {
        width: "110",
        prop: "ingress",
        sortable: true,
        format: true,
        type: "expand"
    },
    {
        width: "110",
        prop: "egress",
        sortable: true,
        format: true,
        type: "expand"
    }
]

module.exports = arr