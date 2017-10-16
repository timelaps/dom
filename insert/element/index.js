module.exports = insertElement;
var isElement = require('../../is/element');
var isWindow = require('@timelaps/is/window');
var fragment = require('../../fragment');
var window = require('../../window');
var insertBefore = require('../before');
var insertAfter = require('../after');
var test = require('../../test-div');
var needsParent = require('../needs-parent');
var supported = require('../supported');
var supports = !!test.insertAdjacentElement;

function insertElement(el, location, newEl) {
    var isFrag;
    if (!isElement(newEl) && !(isFrag = isFragment(newEl))) {
        return false;
    }
    if (!supported[location]) {
        return false;
    }
    if (needsParent[location] && !el.parentNode) {
        return false;
    }
    if (supports && !isFrag) {
        el.insertAdjacentElement(location, newEl);
        return true;
    }
    if (location === 'beforecontent') {
        return prepend(el, newEl);
    } else if (location === 'aftercontent') {
        return append(el, newEl);
    } else if (isFrag) {
        // this is where fragment capabilities end
        return false;
    } else if (location === 'beforebegin') {
        return insertBefore(parent, newEl, el);
    } else if (location === 'afterend') {
        return insertAfter(parent, newEl, el);
    }
    return false;
}