module.exports = insertHTML;
var isString = require('@timelaps/is/array');
var isElement = require('../../is/element');
var isWindow = require('@timelaps/is/window');
var fragment = require('../../fragment');
var window = require('../../window');
var tagName = require('../../tag/name');
var needsParent = require('../needs-parent');
var supported = require('../supported');
var doNotUseWith = {
    table: true,
    tbody: true,
    thead: true,
    tr: true
};

function insertHTML(el, location, newEls) {
    var frag;
    if (!newEls || isWindow(newEls)) {
        return false;
    }
    if (!el.parentNode || needsParent[location]) {
        return false;
    }
    if (!isString(newEls) || !supported[location]) {
        return false;
    }
    if (isFragment(el) || doNotUseWith[tagName(el)]) {
        frag = fragment(window(el), newEls);
        return insertElement(el, location, frag);
    } else if (isElement(el)) {
        el.insertAdjacentHTML(location, newEls);
        return true;
    }
    return false;
}