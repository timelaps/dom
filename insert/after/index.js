var nextSibling = require('../../sibling/next');
var append = require('../../child/append');
var wrap = require('../');
var last = require('../../child/last');
module.exports = wrap(last, nextSibling, insertAfter);

function insertAfter(parent, el, sibling, current) {
    if (!current || !sibling) {
        return append(parent, el);
    } else if (current !== el) {
        parent.insertBefore(el, current);
        return true;
    }
    return false;
}