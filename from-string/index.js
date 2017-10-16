module.exports = toDOM;
var toArray = require('@timelaps/to/array');
var create = require('../create');
var isString = require('@timelaps/is/string');
var isElement = require('../is/element');
var html = require('../child/html');

function toDOM(window, string) {
    if (!isString(string)) {
        if (isElement(string)) {
            return [string];
        }
        return toArray(string);
    }
    var div = create(window)('div');
    html(div, string);
    var list = toArray(div.children);
    // wipe out parent from child.parentNode
    div.innerHTML = '';
    return list;
}