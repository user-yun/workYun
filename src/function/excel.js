require("file-saver");
let XLSX = require("xlsx");
export default function downloadChargeExl() {
    let tmpdata = [];
    tmpdata["!cols"] = [{
        wch: 18
    }, ];
    tmpdata["!merges"] = [{
        s: {
            c: 0,
            r: 0
        },
        e: {
            c: 4,
            r: 0
        }
    }, ];
    tmpdata["A1"] = {
        v: '测试',
        s: {
            alignment: {
                horizontal: 'center'
            },
            font: {
                name: "仿宋",
                sz: 12,
                color: "#000000",
                bold: true
            }
        }
    };
    let sheet_name = "测试";
    let sheet_name1 = "测试1";
    let sheet_name2 = "测试2";
    let tmpWB = {
        SheetNames: [sheet_name1, sheet_name2], //保存的表标题     
        Sheets: {
            [sheet_name1]: Object.assign({},
                tmpdata, {
                    '!ref': 'A1:H2'
                }
            ),
            [sheet_name2]: Object.assign({},
                tmpdata, {
                    '!ref': 'A1:H2'
                }
            )
        }
    }
    let tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    }))], {
        type: "application/octet-stream"
    });
    saveAs(tmpDown, sheet_name + ".xlsx")
}

function s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}