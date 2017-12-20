var CustomEvent = require('../custom');
module.exports = dispatch;

function dispatch(el, name, options) {
    return el.dispatchEvent(new CustomEvent(name, options));
}