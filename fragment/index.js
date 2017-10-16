module.exports = fragment;
var toArray = require('@timelaps/to/array');
var append = require('../child/append');
var reduce = require('@timelaps/array/reduce');
var fromString = require('../from-string');

function fragment(window, contents) {
    var fragment = window.document.createDocumentFragment();
    return contents ? reduce(fromString(window, contents), function (frag, el) {
        append(frag, el);
        return frag;
    }, fragment) : fragment;
}