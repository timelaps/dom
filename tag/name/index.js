module.exports = tagName;
var isObject = require('@timelaps/is/object');

function tagName(tag) {
    var tagName;
    return isElement(tag) ? ((tagName = tag.tagName) && tagName.toLowerCase()) || "" : "";
}