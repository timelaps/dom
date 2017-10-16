var b = require('@timelaps/batterie');
var dispatch = require('./');
var $ = require('../global');
b.describe('dispatch', function () {
    b.expect(dispatch).toBeFunction();
    b.expect(dispatch(window)).toBeFunction();
    b.expect(dispatch).toThrow();
    b.it('dispatches events on elements', function (t) {
        var $div = $.create('div');
        $div.addEventListener('custom', function (e) {
            t.expect(e).toBeObject();
        });
        var dispatcher = dispatch(window);
        dispatcher($div, 'custom');
    });
});