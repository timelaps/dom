module.exports = prepend;
var firstChild = require('../first');
var append = require('../append');
var insertBefore = require('../../insert/before');

function prepend(parent, el) {
    var first;
    if (el && (first = firstChild(parent)) !== el) {
        if (first) {
            return insertBefore(parent, el, first);
        } else {
            return append(parent, el);
        }
    }
    return false;
}