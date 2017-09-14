module.exports = childAll;

function childAll(el) {
    return el.children || el.childNodes;
}