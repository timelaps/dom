module.exports = insertAfter;
var nextSibling = require('../sibling/next');
var isNil = require('@timelaps/is/nil');
var append = require('../../child/append');
var insertBefore = require('../../insert/before');

function insertAfter(el, target) {
    var parent = target.parentNode;
    if (!parent) {
        return;
    }
    var nextSib = nextSibling(target);
    if (isNil(nextSib)) {
        append(parent, el);
    } else {
        insertBefore(el, parent, nextSib);
    }
}
