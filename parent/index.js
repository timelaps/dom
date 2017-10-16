module.exports = parent;
var reduce = require('@timelaps/n/reduce');
var toArray = require('@timelaps/to/array');
var contains = require('@timelaps/n/contains');
var whilst = require('@timelaps/fn/whilst');
var matches = require('../matches');

function parent(window) {
    var matcher = matches(window);
    return function ($el, selector, matches_, next_, stopearly) {
        var match = matches_ || matcher;
        var n = next_ || next;
        var parent;
        if (isNil(selector)) {
            return n($el);
        } else {
            return whilst(function (memo) {
                return !memo && (parent = n(parent));
            }, function (memo) {
                if (match(parent, selector)) {
                    return parent;
                }
            });
        }
    };
}

function next(element) {
    return element.parentNode;
}