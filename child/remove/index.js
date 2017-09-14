module.exports = remove;

function remove(el) {
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
    return el;
}