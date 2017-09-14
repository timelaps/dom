module.exports = accessor;
var childAll = require('../../child/all');
var indexOf = require('@timelaps/n/index/of');

function accessor(key, indexer) {
    return function (target) {
        var next = target[key];
        if (next) {
            return next;
        }
        var parent = target.parentNode;
        if (!parent) {
            return;
        }
        var children = childAll(parent);
        var index = indexOf(children, target);
        return children[indexer(index)] || null;
    };
}