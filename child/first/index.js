module.exports = firstChild;

function firstChild(el) {
    var children = el && (el.children || el.childNodes);
    return children && children[0];
}