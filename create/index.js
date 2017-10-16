module.exports = createElement;
var remove = require('../remove');
var stringify = require('../stringify');
var fromString = require('../from-string');

function createElement(window) {
    var document = window.document;
    var defaultStringify = stringify();
    return function createElement(tag, attributes, options) {
        var str;
        if (attributes) {
            str = options ? stringify(options) : defaultStringify;
            str = str({
                tagName: tag,
                attributes: attributes
            });
            return fromString(window, str)[0];
        } else {
            return document.createElement(tag);
        }
    };
}