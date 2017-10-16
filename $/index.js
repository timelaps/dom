module.exports = $;
var toArray = require('@timelaps/to/array');
var next = require('@timelaps/css/next/$');
var context = require('./context');

function $(window) {
    return next(window.document, context, $);

    function $(string, context) {
        // in the future, you can use css selector
        return toArray(context.querySelectorAll(string));
    }
}