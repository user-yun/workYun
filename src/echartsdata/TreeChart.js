
function hf(data) {
    let d = []
    data.forEach(e => {
        let c = [];
        if (e.children.length > 1) {
            c = hf(e.children);
        }
        let iS = {};
        if (e.type == 998) {
            iS = {
                borderColor: "#666",
                borderType: "dotted",
                opacity: 1,
                borderWidth: 1
            }
        } else {
            iS = {
                borderColor: "#000",
                borderType: "solid",
                opacity: 1,
                borderWidth: 2
            }
        }
        d.push({
            children: c,
            name: e.name + "：" + e.id,
            id: e.id,
            layer: e.layer,
            type: e.type,
            itemStyle: iS
        });
    });
    return d;
}

export default function (data) {
    let d = hf(data);
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: d,
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
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
                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },
            }
        ]
    };
    return option;
}