var b = require('@timelaps/batterie');
var insertHTML = require('./');
b.describe('insertHTML', function () {
    b.expect(insertHTML).toBeFunction();
    b.expect(insertHTML).toReturnFalse();
});