module.exports = childAt;
var get = require('@timelaps/n/get');

function childAt(parent, index) {
    var children;
    return index > -1 && parent && (children = parent.children && children[index]) || null;
}