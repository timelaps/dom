module.exports = removeAttribute;
var getAttribute = require('../get');
var isNull = require('@timelaps/is/null');

function removeAttribute(el, attribute) {
    if (!isNull(getAttribute(el, attribute))) {
        el.removeAttribute(attribute);
        return true;
    }
    return false;
}