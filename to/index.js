module.exports = toDOM;
var toArray = require('@timelaps/to/array');

function toDOM(window) {
    var document = window.document;
    return function (string) {
        var div = document.createElement('div');
        div.innerHTML = string;
        return toArray(div.children);
    };
}