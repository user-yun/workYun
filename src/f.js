Array.prototype.max = function () {
    return Math.max.apply({}, this);
}
Array.prototype.min = function () {
    return Math.min.apply({}, this);
}