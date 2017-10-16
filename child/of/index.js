module.exports = childOf;

function childOf(parent, el) {
    return !!(el && el.parentNode === parent);
}