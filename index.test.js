var b = require('@timelaps/batterie');
var dom = require('./');
b.describe('dom', function () {
    b.expect(dom).toBeObject();
    var $ = dom.scope(window);
    b.expect($).toBeFunction();
});