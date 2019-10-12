
function hf(data) {
    let d = []
    data.forEach(e => {
        let c = [];
        if (e.children.length >= 1) {
            c = hf(e.children);
        }
        let itemStyle = {};
        let label = {};
        let Color = e.color;
        let opacity = e.opacity;
        // if (e.type == 998) {
        //     itemStyle = {
        //         borderColor: Color ? Color : "#666",
        //         color: Color ? Color : "#666",
        //         borderType: "dotted",
        //         opacity: opacity == 0 ? opacity : 1,
        //         borderWidth: 1
        //     }
        // } else {
        itemStyle = {
            borderColor: Color ? Color : "#000",
            color: Color ? Color : "#000",
            borderType: "solid",
            opacity: opacity == 0 ? opacity : 1,
            borderWidth: 2
        }
        label = {
            color: Color ? Color : "#000"
        }
        // }
        d.push({
            children: c,
            name: e.name + "\n" + e.id,
            id: e.id,
            layer: e.layer,
            type: e.type,
            itemStyle,
            label,
        });
    });
    return d;
}
function hd(l) {
    let w1 = [{ top: '10%', left: '10%', bottom: '10%', right: '10%' }]

    let w2 = [{ top: '10%', left: '10%', bottom: '55%', right: '10%' },
    { top: '55%', left: '10%', bottom: '10%', right: '10%' }]

    let w4 = [{ top: '10%', left: '10%', bottom: '55%', right: '55%' },
    { top: '10%', left: '55%', bottom: '55%', right: '10%' },
    { top: '55%', left: '10%', bottom: '10%', right: '55%' },
    { top: '55%', left: '55%', bottom: '10%', right: '10%' }]

    let wl = [0, w1, w2, w4, w4]
    return wl[l]
}
export default function (data, orient) {
    if (!orient) orient = "LR"
    let wl = hd(data.length)
    let series = []
    data.forEach((e, i) => {
        let w = wl[i]
        let o = Object.assign({
            type: 'tree',
            data: hf(e),
            orient,
            initialTreeDepth: -1,
            symbolSize: 20,
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 18,
                },
            },
            lineStyle: {
                curveness: 1
            },
            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
        }, w);
        series.push(o)
    });
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series
    };
    return option;
}