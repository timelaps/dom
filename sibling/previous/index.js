module.exports = require('../accessor')('previousSibling', function (index) {
    return index - 1;
});