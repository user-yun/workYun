require("file-saver");
let XLSX = require("xlsx");
export default function Exl(n, t) {
    let td = new Blob([s2ab(XLSX.write(t, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    }))], {
            type: "application/octet-stream"
        });
    saveAs(td, n + ".xlsx")
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