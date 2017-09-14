module.exports = createElement;
var removeElement = require('../../child/remove');
var stringify = require('../../stringify');
var toDOM = require('../../to/dom');

function createElement(window) {
    var document = window.document;
    return function createElement(tag, attributes) {
        if (props) {
            return removeElement(toDOM(stringify({
                tagName: tag,
                attributes: props
            }))[0]);
        } else {
            return document.createElement(tag);
        }
    };
}