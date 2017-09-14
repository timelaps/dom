module.exports = lastChild;
var last = require('@timelaps/n/last');

function lastChild(el) {
    return el && last(el.children);
}