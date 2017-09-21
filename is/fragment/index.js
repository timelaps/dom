module.exports = isFragment;

function isFragment(document) {
    return function (frag) {
        return frag && frag.nodeType === document.DOCUMENT_FRAGMENT_NODE;
    };
}