module.exports = attribute;
var isNull = require('@timelaps/is/null');
var isUndefined = require('@timelaps/is/undefined');
var isFalse = require('@timelaps/is/false');
var isTrue = require('@timelaps/is/true');
var setAttribute = require('./set');
var getAttribute = require('./get');
var removeAttribute = require('./remove');
attribute.get = getAttribute;
attribute.set = setAttribute;
attribute.remove = removeAttribute;

function attribute(el, key, value) {
    if (isNull(value) || isFalse(value)) {
        removeAttribute(el, key);
    } else if (isUndefined(value)) {
        return getAttribute(el, key);
    } else {
        setAttribute(el, key, isTrue(value) ? '' : value + '');
    }
}