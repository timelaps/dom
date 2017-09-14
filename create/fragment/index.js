module.exports = fragment;
var toArray = require('@timelaps/to/array');
var append = require('../../child/append');
var reduce = require('@timelaps/array/reduce');

function fragment(window) {
    var document = window.document;
    return function (contents) {
        return reduce(toArray(contents), function (frag, el) {
            append(frag, el);
            return frag;
        }, document.createDocumentFragment());
    };
}