var element = require('./element');
var fragment = require('./fragment');
module.exports = function (window) {
    return {
        element: element(window),
        fragment: fragment(window)
    };
};