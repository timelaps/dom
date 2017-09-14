module.exports = $;
var toArray = require('@timelaps/to/array');

function $(window) {
    var document = window.document;
    return function (string, context) {
        var ctx = context || document;
        return toArray(ctx.querySelectorAll(string));
    };
}