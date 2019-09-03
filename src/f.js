Array.prototype.max = function () {
    return Math.max.apply({}, this);
}
Array.prototype.min = function () {
    return Math.min.apply({}, this);
}
Array.prototype.operation = function (i, o) {
    let s = 0;
    let a = 0;
    if (i == undefined) {
        s = this[0];
        a = this[0];
        if (o == "-") {
            this.forEach(e => {
                s -= parseFloat(e);
            });
            s += a;
        }
        else if (o == "*") {
            this.forEach(e => {
                s *= parseFloat(e);
            });
            s /= a;
        }
        else if (o == "/") {
            this.forEach(e => {
                s /= parseFloat(e);
            });
            s *= a;
        } else {
            this.forEach(e => {
                s += parseFloat(e);
            });
            s -= a;
        }

    } else {
        s = this[0][i];
        a = this[0][i];
        if (o == "-") {
            this.forEach(e => {
                s -= parseFloat(e[i]);
            });
            s += a;
        }
        else if (o == "*") {
            this.forEach(e => {
                s *= parseFloat(e[i]);
            });
            s /= a;
        }
        else if (o == "/") {
            this.forEach(e => {
                s /= parseFloat(e[i]);
            });
            s *= a;
        } else {
            this.forEach(e => {
                s += parseFloat(e[i]);
            });
            s -= a;
        }

    }
    return s;
}
// Object.prototype.hasOwnProperty()
// 返回一个布尔值，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
// Object.prototype.isPrototypeOf()
// 返回一个布尔值，表示指定的对象是否在本对象的原型中。
// Object.prototype.propertyIsEnumerable()()
// 返回一个布尔值，表示某个对象是否含有指定的属性，并且可以枚举。