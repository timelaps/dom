module.exports = windo;

function windo(el) {
    return el.ownerDocument.defaultView;
}