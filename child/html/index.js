module.exports = html;
var get = require('@timelaps/n/get');

function html(div, string) {
    var document = div.ownerDocument;
    var innerShim = get(document, ['registerElement', 'innerHTML']);
    if (innerShim) {
        innerShim(div, string);
    } else {
        div.innerHTML = string;
    }
}