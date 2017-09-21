module.exports = isDocument;
var isNumber = require('@timelaps/is/number');

function isDocument(obj) {
    return obj && isNumber(obj.nodeType) && obj.nodeType === obj.DOCUMENT_NODE;
}