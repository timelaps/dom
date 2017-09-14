module.exports = setAttribute;
var getAttribute = require('../get');

function setAttribute(el, attribute, value) {
    var current = getAttribute(el, attribute);
    if (current !== value) {
        return el.setAttribute(attribute, value);
    }
}