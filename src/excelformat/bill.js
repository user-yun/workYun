export default function bill(that, n, o) {
    let s = {
        alignment: {
            horizontal: "center", vertical: "center"
        },
        font: {
            name: "仿宋",
            sz: 12,
            color: "#000000",
            bold: true
        }
    };
    let exc = {
        SheetNames: [],
        Sheets: {}
    }
    o.forEach(e => {
        let p = {};
        that.$set(p, "!cols", [{ wch: 24 }]);
        that.$set(p, "!merges", [{ s: { c: 0, r: 0 }, e: { c: 4, r: 0 } }]);

        that.$set(p, "A1", { v: e.content, s });

        that.$set(p, "!ref", "A1:H2");
        exc.SheetNames.push(e.title);
        that.$set(exc.Sheets, e.title, p);

    });
    require("@/function/excel.js").default(n, exc);
}

