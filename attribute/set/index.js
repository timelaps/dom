module.exports = setAttribute;
var getAttribute = require('../get');
var removeAttribute = require('../remove');
var isNull = require('@timelaps/is/null');

function setAttribute(el, attribute, value) {
    if (el.getAttribute(attribute) === value) {
        return false;
    }
    if (isNull(value)) {
        return removeAttribute(el, attribute);
    } else {
        el.setAttribute(attribute, value);
        return true;
    }
}