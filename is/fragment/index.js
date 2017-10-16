module.exports = isFragment;

function isFragment(frag) {
    return frag && frag.nodeType === frag.DOCUMENT_FRAGMENT_NODE;
}