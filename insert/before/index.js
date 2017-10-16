var wrap = require('../');
var first = require('../../child/first');
var previousSibling = require('../../sibling/previous');
var prepend = require('../../child/prepend');
var append = require('../../child/append');
module.exports = wrap(first, previousSibling, insertBefore);

function insertBefore(parent, el, sibling, current) {
    if (sibling) {
        if (current !== el) {
            if (sibling.parentNode !== parent) {
                return prepend(parent, el);
            }
            parent.insertBefore(el, sibling);
            return true;
        }
        return false;
    } else {
        return append(parent, el);
    }
}