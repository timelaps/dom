module.exports = parentMany;
var parent = require('../');
var reduce = require('@timelaps/array/reduce');
var toArray = require('@timelaps/to/array');
var contains = require('@timelaps/n/contains');

function parentMany(window) {
    var p = parent(window);
    return function ($els, selector, matcher, next) {
        return reduce(toArray($el), function (memo, el) {
            var found = p(el, selector, matcher, next);
            if (found && !contains(memo, found)) {
                memo.push(found);
            }
            return memo;
        }, []);
    };
}