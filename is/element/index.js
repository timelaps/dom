module.exports = isElement;

function isElement(object) {
    return !!(object && isNumber(object.nodeType) && object.nodeType === object.ELEMENT_NODE);
}