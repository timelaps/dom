module.exports = matches;
var append = require('../child/append');
var $_ = require('../$');
var createElement = require('../create/element');
var indexOf = require('@timelaps/n/index/of');
var remove = require('../child/remove');

function matches(window) {
    var document = window.document;
    var $ = $_(document);
    var create = createElement(document);
    return function (element, selector) {
        var match, parent, matchesSelector;
        if (!selector || !element || element[NODE_TYPE] !== 1) {
            return false;
        }
        matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
        if (matchesSelector) {
            return matchesSelector.call(element, selector);
        }
        // fall back to performing a selector:
        parent = element[PARENT_NODE];
        var original = parent;
        if (!parent) {
            parent = create('div');
            append(parent, element);
        }
        var result = indexOf($(selector, parent), element) !== -1;
        if (!original) {
            remove(element);
        }
        return result;
    };
}