module.exports = $one;
var context = require('../context');
var next = require('@timelaps/css/next');

function $one(window) {
    return next(window.document, context, $one)[0] || null;

    function $one(selector, context) {
        var el = context.querySelector(selector);
        return el ? [el] : [];
    }
}