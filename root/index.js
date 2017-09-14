module.exports = rootElement;
var get = require('@timelaps/n/get/deep');

function rootElement(el) {
    return get(el, ['ownerDocument', 'head', 'parentNode']);
}