module.exports = childAll;
var toArray = require('@timelaps/to/array');

function childAll(el) {
    return toArray(el && (el.children || el.childNodes) || []);
}