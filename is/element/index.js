module.exports = isElement;
var isNumber = require('@timelaps/is/number');

function isElement(object) {
    return !!(object && isNumber(object.nodeType) && object.nodeType === object.ELEMENT_NODE);
}