module.exports = append;
var lastChild = require('../last');
var isElement = require('../../is/element');
var isFragment = require('../../is/fragment');
var isWindow = require('@timelaps/is/window');

function append(parent, el_) {
    var el = el_;
    if (!isWindow(el) && !isFragment(el) && !isElement(el)) {
        el = fragment({
            document: parent.ownerDocument
        })(el);
    }
    if (el && (el.parentNode !== parent || lastChild(parent) !== el)) {
        parent.appendChild(el);
        return true;
    }
    return false;
}

function appendmany(fragment, child) {
    fragment.appendChild(child);
    return fragment;
}