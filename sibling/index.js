var isNull = require('@timelaps/is/null');
var test = require('../test-div');
module.exports = accessor;
accessor.next = require('./next');
accessor.previous = require('./previous');
var indexOf = require('@timelaps/n/index/of');
var childAt = require('../child/at');

function accessor(key, indexer) {
    return isNull(test[key]) ? function (target) {
        return target[key];
    } : function (target) {
        var parent = target.parentNode;
        if (!parent) {
            return;
        }
        var children = parent.children;
        var index = indexOf(children, target);
        return childAt(parent, indexer(index));
    };
}