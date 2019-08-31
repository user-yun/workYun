Array.prototype.max = function () {
    return Math.max.apply({}, this);
}
Array.prototype.min = function () {
    return Math.min.apply({}, this);
}
Array.prototype.sums = function (i) {
    let s = 0;
    if (i == undefined) {
        this.forEach(e => {
            s += parseInt(e);
        });
    } else {
        this.forEach(e => {
            s += parseInt(e[i]);
        });
    }
    return s;
}