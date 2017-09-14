module.exports = append;
var lastChild = require('../last-child');

function append(parent, el) {
    if (el && (el.parentNode !== parent || lastChild(parent) !== el)) {
        parent.appendChild(el);
    }
}