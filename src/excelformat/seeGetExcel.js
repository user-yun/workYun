
function align(t) {
    return { alignment: { horizontal: t, vertical: 'center' }, font: { name: "仿宋", sz: 10, color: "#000000", bold: true } }
}

export default function bill(that, n, o, c) {
    let t = 'n';
    let exc = {
        SheetNames: [],
        Sheets: {}
    }
    let row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
    o.forEach((oe, oei) => {
        let p = {};
        that.$set(p, "!cols", []);
        that.$set(p, "!merges", [{ s: { c: 0, r: 0 }, e: { c: c.length - 1, r: 0 } }]);
        that.$set(p, "A1", { v: oe.name, s: align("center") });
        let i = 2;
        c.forEach((ce, cei) => {
            p["!cols"].push({ wch: parseInt(ce.width) / 10 });
            that.$set(p, row[cei] + i, { v: ce.label ? ce.label : ce.prop, s: align(ce.align ? ce.align : "center") });
        })
        oe.list.forEach((oee, oeei) => {
            i++;
            c.forEach((ce, cei) => {
                that.$set(p, row[cei] + i, { v: oee[ce.prop], s: align(ce.align ? ce.align : "center"), t: ce.type == Number ? "n" : "" });
            })
        });
        that.$set(p, "!ref", "A1:" + row[c.length - 1] + i);
        exc.SheetNames.push(oe.name);
        that.$set(exc.Sheets, oe.name, p);
    });
    require("@/function/excel.js").default(n, exc);
}