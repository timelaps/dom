module.exports = insertBefore;
var isNil = require('@timelaps/is/nil');
var isNumber = require('@timelaps/is/number');
var append = require('../append');
var prepend = require('../child/prepend');

function insertBefore(el, parent, index) {
    var child;
    if (isNil(index)) {
        return prepend(parent, el);
    } else if (isNumber(index)) {
        child = parent.children[index];
    } else {
        child = index;
    }
    if (child) {
        parent.insertBefore(el, child);
    } else {
        append(parent, el);
    }
}