module.exports = insertion;
var isNil = require('@timelaps/is/nil');
var isNumber = require('@timelaps/is/number');
var indexOf = require('@timelaps/n/index/of');
var has = require('@timelaps/n/has/shallow');
var test = require('../test-div');
var create = require('../create');
var childAt = require('../child/at');
insertion.before = require('./before');
insertion.after = require('./after');

function insertion(noIndex, getSibling, fn) {
    return function (parent_, el, index_) {
        var children,
            child,
            parent = parent_,
            index = index_,
            sibling = null;
        if (el === index) {
            return false;
        }
        if (!parent && index) {
            parent = index.parentNode;
        }
        if (!parent) {
            return false;
        }
        children = parent.children;
        // just to make sure you don't err
        if (!children) {
            return false;
        }
        if (isNumber(index)) {
            index = children[index];
        }
        if (isNil(index)) {
            child = noIndex(parent);
        } else {
            // child is the index
            child = index;
            sibling = getSibling(child);
        }
        return fn(parent, el, child, sibling, index);
    };
}