module.exports = rootMany;
var returnsTrue = require('@timelaps/returns/true');
// nullify the parent many since we're just passing our validators
var parentMany = require('../../parent/many')({});
var htmlElement = require('..');

function rootMany($els) {
    return parentMany($els, null, returnsTrue, htmlElement);
}