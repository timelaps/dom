module.exports = prepend;
var firstChild = require('../first-child');

function prepend(parent, el) {
    var first;
    if (el && (first = firstChild(parent)) !== el) {
        if (!first) {
            parent.appendChild(el);
        } else {
            parent.insertBefore(el, first);
        }
    }
}